ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ALTER COLUMN is_approved SET DEFAULT true;

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

DROP POLICY IF EXISTS "Allow public read access" ON public.reviews;
DROP POLICY IF EXISTS "Allow public insert access" ON public.reviews;

CREATE POLICY "Allow public read access"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public insert access"
ON public.reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (true);