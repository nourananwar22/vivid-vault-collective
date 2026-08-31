
-- ROLES -----------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'moderator')
  )
$$;

CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));

CREATE POLICY "Admins manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- PROFILES --------------------------------------------------------------
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  display_name text,
  bio text,
  avatar_url text,
  website text,
  is_creator boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly viewable"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users insert their own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users update their own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1)),
    lower(split_part(COALESCE(NEW.email, NEW.id::text), '@', 1)) || '-' || substr(NEW.id::text, 1, 6),
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- CATEGORIES ------------------------------------------------------------
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  cover_path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are public"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins manage categories"
  ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- WALLPAPERS ------------------------------------------------------------
CREATE TYPE public.content_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.wallpapers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  storage_path text NOT NULL,
  preview_path text,
  width integer NOT NULL DEFAULT 0,
  height integer NOT NULL DEFAULT 0,
  file_type text NOT NULL DEFAULT 'JPG',
  size_bytes bigint NOT NULL DEFAULT 0,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  tags text[] NOT NULL DEFAULT '{}',
  is_premium boolean NOT NULL DEFAULT false,
  price_cents integer,
  license text NOT NULL DEFAULT 'Pixelvault Free License',
  status public.content_status NOT NULL DEFAULT 'pending',
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  view_count integer NOT NULL DEFAULT 0,
  download_count integer NOT NULL DEFAULT 0,
  like_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX wallpapers_status_created_idx ON public.wallpapers (status, created_at DESC);
CREATE INDEX wallpapers_category_idx ON public.wallpapers (category_id);
CREATE INDEX wallpapers_tags_idx ON public.wallpapers USING gin (tags);

GRANT SELECT ON public.wallpapers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wallpapers TO authenticated;
GRANT ALL ON public.wallpapers TO service_role;
ALTER TABLE public.wallpapers ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER wallpapers_set_updated_at
  BEFORE UPDATE ON public.wallpapers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Approved wallpapers are public"
  ON public.wallpapers FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Creators and staff read their own submissions"
  ON public.wallpapers FOR SELECT TO authenticated
  USING (author_id = auth.uid() OR public.is_staff(auth.uid()));

CREATE POLICY "Creators submit wallpapers"
  ON public.wallpapers FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid() AND status = 'pending');

CREATE POLICY "Creators update their own pending wallpapers"
  ON public.wallpapers FOR UPDATE TO authenticated
  USING (author_id = auth.uid() OR public.is_staff(auth.uid()))
  WITH CHECK (author_id = auth.uid() OR public.is_staff(auth.uid()));

CREATE POLICY "Authors and staff delete wallpapers"
  ON public.wallpapers FOR DELETE TO authenticated
  USING (author_id = auth.uid() OR public.is_staff(auth.uid()));

-- FAVORITES -------------------------------------------------------------
CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallpaper_id uuid NOT NULL REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, wallpaper_id)
);

GRANT SELECT, INSERT, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their favorites"
  ON public.favorites FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.sync_like_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.wallpapers SET like_count = like_count + 1 WHERE id = NEW.wallpaper_id;
    RETURN NEW;
  ELSE
    UPDATE public.wallpapers SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.wallpaper_id;
    RETURN OLD;
  END IF;
END;
$$;

CREATE TRIGGER favorites_sync_like_count
  AFTER INSERT OR DELETE ON public.favorites
  FOR EACH ROW EXECUTE FUNCTION public.sync_like_count();

-- COLLECTIONS -----------------------------------------------------------
CREATE TABLE public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.collections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.collections TO authenticated;
GRANT ALL ON public.collections TO service_role;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER collections_set_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Public collections are viewable"
  ON public.collections FOR SELECT USING (is_public = true);

CREATE POLICY "Users manage their collections"
  ON public.collections FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.collection_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  wallpaper_id uuid NOT NULL REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (collection_id, wallpaper_id)
);

GRANT SELECT ON public.collection_items TO anon;
GRANT SELECT, INSERT, DELETE ON public.collection_items TO authenticated;
GRANT ALL ON public.collection_items TO service_role;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Items of public collections are viewable"
  ON public.collection_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.collections c
    WHERE c.id = collection_id AND c.is_public = true
  ));

CREATE POLICY "Users manage items in their collections"
  ON public.collection_items FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.collections c
    WHERE c.id = collection_id AND c.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.collections c
    WHERE c.id = collection_id AND c.user_id = auth.uid()
  ));

-- DOWNLOADS -------------------------------------------------------------
CREATE TABLE public.downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallpaper_id uuid NOT NULL REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  resolution text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX downloads_user_created_idx ON public.downloads (user_id, created_at DESC);

GRANT SELECT, INSERT ON public.downloads TO authenticated;
GRANT ALL ON public.downloads TO service_role;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read their download history"
  ON public.downloads FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));

CREATE POLICY "Users record their downloads"
  ON public.downloads FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.sync_download_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.wallpapers
  SET download_count = download_count + 1
  WHERE id = NEW.wallpaper_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER downloads_sync_count
  AFTER INSERT ON public.downloads
  FOR EACH ROW EXECUTE FUNCTION public.sync_download_count();

-- REPORTS ---------------------------------------------------------------
CREATE TYPE public.report_status AS ENUM ('open', 'reviewing', 'resolved', 'dismissed');

CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallpaper_id uuid NOT NULL REFERENCES public.wallpapers(id) ON DELETE CASCADE,
  reporter_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reason text NOT NULL,
  details text,
  status public.report_status NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reporters and staff read reports"
  ON public.reports FOR SELECT TO authenticated
  USING (reporter_id = auth.uid() OR public.is_staff(auth.uid()));

CREATE POLICY "Signed in users can report"
  ON public.reports FOR INSERT TO authenticated
  WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Staff update reports"
  ON public.reports FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- VIEW COUNTER ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.increment_view(_slug text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.wallpapers SET view_count = view_count + 1
  WHERE slug = _slug AND status = 'approved';
$$;

GRANT EXECUTE ON FUNCTION public.increment_view(text) TO anon, authenticated;
