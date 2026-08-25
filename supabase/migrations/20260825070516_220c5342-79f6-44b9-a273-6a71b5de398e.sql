CREATE POLICY "Allow public review proof uploads"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'review-proofs');

CREATE POLICY "Allow public review proof reads"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'review-proofs');