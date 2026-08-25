import { queryOptions } from "@tanstack/react-query";
import { getReviews } from "@/lib/reviews.functions";

export const reviewsQueryOptions = () =>
  queryOptions({
    queryKey: ["reviews"],
    queryFn: () => getReviews(),
    staleTime: 30_000,
  });