-- SUBSCRIPTIONS & PLANS ------------------------------------------------
CREATE TABLE IF NOT EXISTS public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  price_cents integer NOT NULL DEFAULT 0,
  interval text NOT NULL DEFAULT 'month',
  download_limit integer,
  features text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.plans TO anon, authenticated;
GRANT ALL ON public.plans TO service_role;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plans are publicly viewable"
  ON public.plans FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES public.plans(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz DEFAULT (now() + interval '1 month'),
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read their own subscription"
  ON public.subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'succeeded',
  payment_method text,
  stripe_payment_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read their own payments"
  ON public.payments FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));

-- SEED DEFAULT CATEGORIES ----------------------------------------------
INSERT INTO public.categories (slug, name, description, cover_path) VALUES
('nature', 'Nature', 'Breathtaking landscapes, forests, mountains, and seascapes.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'),
('urban', 'Urban', 'Futuristic cities, cyberpunk streets, and modern skylines.', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80'),
('abstract', 'Abstract', 'Fluid motion, geometric patterns, 3D renders, and vibrant textures.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'),
('architecture', 'Architecture', 'Brutalist curves, minimal facades, and iconic structures.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'),
('space', 'Space', 'Cosmic nebulae, deep space vistas, planets, and starry skies.', 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'),
('minimal', 'Minimal', 'Clean lines, dark tones, subtle gradients, and focused compositions.', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80'),
('technology', 'Technology', 'Code circuits, neon cyber grids, hardware, and futuristic UI.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'),
('cars', 'Cars & Automotive', 'Hypercars, classic automobiles, speed trails, and automotive design.', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'),
('anime', 'Anime & Digital Art', 'Vibrant anime landscapes, digital illustrations, and character concept art.', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'),
('gaming', 'Gaming & Setup', 'RGB neon aesthetics, game world concepts, and ultra-wide wallpapers.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'),
('animals', 'Wildlife & Animals', 'Majestic fauna, moody wildlife portraits, and nature closeups.', 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=1200&q=80'),
('photography', 'Photography', 'Cinematic 35mm film shots, street photography, and dramatic portraits.', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (slug) DO NOTHING;

-- SEED PLANS -----------------------------------------------------------
INSERT INTO public.plans (slug, name, description, price_cents, interval, download_limit, features) VALUES
('free', 'Free Explorer', 'Basic access to free wallpapers with daily limits', 0, 'month', 10, ARRAY['Access to 15,000+ free wallpapers', 'Standard HD resolution downloads', '10 downloads per day', 'Basic personal collections']),
('premium', 'Premium Pro', 'Unlimited downloads of 4K & 8K premium wallpapers with bulk export', 1200, 'month', NULL, ARRAY['Unlimited downloads across full library', '4K & 8K Original resolution files', 'One-click Bulk ZIP downloads', 'Commercial use license included', 'Ad-free experience', 'Priority creator support']),
('studio', 'Studio Unlimited', 'Designed for creative agencies, studios, and high-volume commercial projects', 2900, 'month', NULL, ARRAY['Everything in Premium Pro', 'Multi-user team sharing', 'Extended commercial & reseller license', 'API access for asset workflows', 'Custom curation & fast downloads'])
ON CONFLICT (slug) DO NOTHING;
