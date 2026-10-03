DROP POLICY IF EXISTS "Allow public insert access" ON public.reviews;
DROP POLICY IF EXISTS "Allow public read access" ON public.reviews;
DROP POLICY IF EXISTS "Allow public review proof uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public review proof reads" ON storage.objects;