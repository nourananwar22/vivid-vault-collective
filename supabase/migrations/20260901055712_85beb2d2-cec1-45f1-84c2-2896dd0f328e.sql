
-- Storage policies for the private "wallpapers" bucket
CREATE POLICY "Creators upload into their own folder"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'wallpapers'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Creators read their own files"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'wallpapers'
    AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid()))
  );

CREATE POLICY "Creators update their own files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'wallpapers'
    AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid()))
  );

CREATE POLICY "Creators delete their own files"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'wallpapers'
    AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid()))
  );

-- Seed categories
INSERT INTO public.categories (slug, name, description, cover_path) VALUES
  ('nature', 'Nature', 'Landscapes, botanicals and the outdoors.', '/images/w1.jpg'),
  ('urban', 'Urban', 'Streets, neon and city nights.', '/images/w2.jpg'),
  ('abstract', 'Abstract', 'Textures, gradients and macro detail.', '/images/w3.jpg'),
  ('architecture', 'Architecture', 'Structure, geometry and light.', '/images/w4.jpg'),
  ('space', 'Space', 'Nebulae, stars and deep sky.', '/images/w5.jpg');

-- Seed wallpapers
INSERT INTO public.wallpapers
  (slug, title, description, storage_path, preview_path, width, height, file_type, size_bytes,
   category_id, tags, is_premium, price_cents, license, status, view_count, download_count, like_count)
VALUES
  ('dawn-ridge-mist', 'Dawn Ridge Mist', 'Layered ridgelines in violet dawn fog.',
   'seed/w1.jpg', '/images/w1.jpg', 3072, 3840, 'JPG', 4404019,
   (SELECT id FROM public.categories WHERE slug = 'nature'),
   ARRAY['mountains','fog','sunrise','minimal','landscape'], false, NULL,
   'Pixelvault Free License — commercial use, no attribution required', 'approved', 96210, 18420, 3120),

  ('neon-rain-district', 'Neon Rain District', 'Rain-slick street glowing with neon signage.',
   'seed/w2.jpg', '/images/w2.jpg', 3840, 2559, 'JPG', 10276044,
   (SELECT id FROM public.categories WHERE slug = 'urban'),
   ARRAY['cyberpunk','neon','city','night','rain'], true, 1200,
   'Pixelvault Premium License — extended commercial use', 'approved', 51890, 9210, 4410),

  ('iridescent-film', 'Iridescent Film', 'Macro study of an iridescent soap film.',
   'seed/w3.jpg', '/images/w3.jpg', 3072, 3072, 'PNG', 6396313,
   (SELECT id FROM public.categories WHERE slug = 'abstract'),
   ARRAY['macro','bubble','texture','colorful','dark'], false, NULL,
   'Pixelvault Free License — commercial use, no attribution required', 'approved', 44120, 12760, 1980),

  ('concrete-curve', 'Concrete Curve', 'Brutalist facade cut by dusk light.',
   'seed/w4.jpg', '/images/w4.jpg', 3072, 4095, 'JPG', 7759462,
   (SELECT id FROM public.categories WHERE slug = 'architecture'),
   ARRAY['brutalist','minimal','dusk','concrete','geometry'], true, 900,
   'Pixelvault Premium License — extended commercial use', 'approved', 28800, 5410, 1450),

  ('violet-nebula', 'Violet Nebula', 'Magenta nebula clouds across deep space.',
   'seed/w5.jpg', '/images/w5.jpg', 3840, 2559, 'JPG', 8703180,
   (SELECT id FROM public.categories WHERE slug = 'space'),
   ARRAY['nebula','stars','cosmos','purple','astro'], false, NULL,
   'Pixelvault Free License — commercial use, no attribution required', 'approved', 133400, 24310, 6820),

  ('midnight-monstera', 'Midnight Monstera', 'Monstera leaves in low, moody light.',
   'seed/w6.jpg', '/images/w6.jpg', 3072, 3840, 'JPG', 5872025,
   (SELECT id FROM public.categories WHERE slug = 'nature'),
   ARRAY['botanical','leaves','moody','green','dark'], true, 700,
   'Pixelvault Premium License — extended commercial use', 'approved', 33920, 7820, 2410);
