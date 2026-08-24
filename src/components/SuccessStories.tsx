import { useState, type FormEvent } from "react";
import { Image as ImageIcon, PlayCircle, Quote, Star, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Review = {
  name: string;
  text: string;
  rating: number;
  videoUrl?: string;
  proofUrl?: string;
  proofName?: string;
};

const INITIAL_REVIEWS: Review[] = [
  {
    name: "Hamza R.",
    rating: 5,
    text: "The XAUUSD structure sessions completely changed my trading. Passed my challenge easily!",
  },
  {
    name: "Ayesha K.",
    rating: 5,
    text: "The lifetime access for $100 is worth every single penny. Best institutional mentorship in Pakistan.",
  },
  {
    name: "Bilal A.",
    rating: 5,
    text: "Precision liquidity sweeps and market structure rules helped me achieve consistent discipline.",
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rated ${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= value ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4 text-muted-foreground"
          }
        />
      ))}
    </div>
  );
}

function toEmbedUrl(url: string) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  return url;
}

export function SuccessStories() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [filePreview, setFilePreview] = useState<{ url: string; name: string } | null>(null);
  const [viewer, setViewer] = useState<{ url: string; name: string } | null>(null);

  const videoReviews = reviews.filter((r) => r.videoUrl);
  const proofReviews = reviews.filter((r) => r.proofUrl);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const text = String(data.get("text") ?? "").trim();
    const videoUrl = String(data.get("videoUrl") ?? "").trim();
    if (!name || !text) return;

    setReviews((prev) => [
      {
        name,
        text,
        rating,
        ...(videoUrl ? { videoUrl } : {}),
        ...(filePreview ? { proofUrl: filePreview.url, proofName: filePreview.name } : {}),
      },
      ...prev,
    ]);
    form.reset();
    setRating(5);
    setFilePreview(null);
    setOpen(false);
  };

  return (
    <section id="reviews" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            Verified Results
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            STUDENT <span className="text-gradient-gold">SUCCESS STORIES</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real feedback, video testimonials and payout proofs from traders inside the mentorship.
          </p>
        </div>

        <Tabs defaultValue="written" className="mt-12">
          <TabsList className="mx-auto flex w-full max-w-xl">
            <TabsTrigger value="written" className="flex-1">
              <Quote className="mr-2 h-4 w-4" /> Written
            </TabsTrigger>
            <TabsTrigger value="video" className="flex-1">
              <PlayCircle className="mr-2 h-4 w-4" /> Video
            </TabsTrigger>
            <TabsTrigger value="proof" className="flex-1">
              <ImageIcon className="mr-2 h-4 w-4" /> Payout Proofs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="written" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <article key={`${r.name}-${i}`} className="glass-card flex flex-col p-6">
                  <Quote className="h-6 w-6 text-primary/60" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="text-sm font-semibold text-foreground">{r.name}</span>
                    <Stars value={r.rating} />
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-8">
            {videoReviews.length === 0 ? (
              <p className="glass-card p-8 text-center text-sm text-muted-foreground">
                No video testimonials yet — submit yours below and it appears here instantly.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videoReviews.map((r, i) => (
                  <article key={`${r.name}-video-${i}`} className="glass-card overflow-hidden">
                    <div className="aspect-video w-full bg-background">
                      <iframe
                        src={toEmbedUrl(r.videoUrl!)}
                        title={`Video testimonial by ${r.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">{r.name}</span>
                        <Stars value={r.rating} />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="proof" className="mt-8">
            {proofReviews.length === 0 ? (
              <p className="glass-card p-8 text-center text-sm text-muted-foreground">
                No payout or MT5 receipt attachments yet — upload yours with your success story.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {proofReviews.map((r, i) => (
                  <button
                    key={`${r.name}-proof-${i}`}
                    type="button"
                    onClick={() => setViewer({ url: r.proofUrl!, name: r.proofName ?? r.name })}
                    className="glass-card group overflow-hidden text-left"
                  >
                    <img
                      src={r.proofUrl}
                      alt={`Payout proof submitted by ${r.name}`}
                      className="h-44 w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="p-4">
                      <span className="text-sm font-semibold">{r.name}</span>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {r.proofName ?? "Attachment"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-10 flex justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="cta" size="xl">
                <Upload /> Submit Your Success Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Submit Your Success Story</DialogTitle>
                <DialogDescription>
                  Share your experience, a video testimonial link and your payout or MT5 receipt.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i)}
                        aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
                        className="cursor-pointer p-1"
                      >
                        <Star
                          className={
                            i <= rating
                              ? "h-6 w-6 fill-primary text-primary"
                              : "h-6 w-6 text-muted-foreground"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text">Review</Label>
                  <Textarea
                    id="text"
                    name="text"
                    rows={4}
                    placeholder="Tell us how the mentorship changed your trading..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL (optional)</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proof">Payout / MT5 receipt (optional)</Label>
                  <Input
                    id="proof"
                    name="proof"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setFilePreview(
                        file ? { url: URL.createObjectURL(file), name: file.name } : null,
                      );
                    }}
                  />
                  {filePreview ? (
                    <div className="relative mt-2 overflow-hidden rounded-lg border border-border">
                      <img
                        src={filePreview.url}
                        alt="Attachment preview"
                        className="h-40 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFilePreview(null)}
                        aria-label="Remove attachment"
                        className="absolute right-2 top-2 cursor-pointer rounded-full bg-background/80 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null}
                </div>

                <Button type="submit" variant="cta" className="w-full">
                  Publish Success Story
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Submissions display on this page for your current session.
                </p>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={!!viewer} onOpenChange={(v) => !v && setViewer(null)}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{viewer?.name}</DialogTitle>
              <DialogDescription>Payout / MT5 receipt attachment</DialogDescription>
            </DialogHeader>
            {viewer ? (
              <img
                src={viewer.url}
                alt={`Full size proof: ${viewer.name}`}
                className="w-full rounded-lg"
              />
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
