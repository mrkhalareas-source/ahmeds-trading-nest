import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getReviews = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicReviewsClient } = await import("@/lib/reviews.server");
  const client = createPublicReviewsClient();
  const { data, error } = await client
    .from("reviews")
    .select("id,name,text,rating,video_url,proof_url,proof_name,created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return Promise.all(
    (data ?? []).map(async (review) => {
      if (!review.proof_url) return review;
      const { data: signed } = await client.storage
        .from("review-proofs")
        .createSignedUrl(review.proof_url, 3600);
      return { ...review, proof_url: signed?.signedUrl ?? null };
    }),
  );
});

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        name: z.string().trim().min(1).max(80),
        text: z.string().trim().min(1).max(2000),
        rating: z.number().int().min(1).max(5),
        videoUrl: z.string().url().max(500).optional(),
        proofPath: z.string().max(500).optional(),
        proofName: z.string().max(255).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { createPublicReviewsClient } = await import("@/lib/reviews.server");
    const client = createPublicReviewsClient();
    const { data: inserted, error } = await client
      .from("reviews")
      .insert({
        name: data.name,
        text: data.text,
        rating: data.rating,
        video_url: data.videoUrl ?? null,
        proof_url: data.proofPath ?? null,
        proof_name: data.proofName ?? null,
      })
      .select("id,name,text,rating,video_url,proof_url,proof_name,created_at")
      .single();
    if (error) throw new Error(error.message);
    return inserted;
  });