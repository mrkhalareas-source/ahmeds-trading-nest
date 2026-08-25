CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 80),
  text TEXT NOT NULL CHECK (char_length(btrim(text)) BETWEEN 1 AND 2000),
  rating SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  video_url TEXT,
  proof_url TEXT,
  proof_name TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public insert access"
ON public.reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (is_approved = true);