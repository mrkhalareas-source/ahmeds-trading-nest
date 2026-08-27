import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Trade With Ahmed | Forex & Gold Trading Mentorship" },
      {
        name: "description",
        content:
          "Premium Forex & Gold (XAUUSD) trading mentorship using Smart Money Concepts and ICT strategies.",
      },
      { name: "author", content: "Trade With Ahmed" },
      { property: "og:title", content: "Trade With Ahmed | Forex & Gold Trading Mentorship" },
      {
        property: "og:description",
        content:
          "Premium Forex & Gold (XAUUSD) trading mentorship using Smart Money Concepts and ICT strategies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SupabaseConfigError({ missing }: { missing: string[] }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0E14] px-4">
      <div className="w-full max-w-xl rounded-2xl border border-[#E5B800]/30 bg-[#0F1117] p-8 shadow-2xl shadow-[#E5B800]/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#E5B800]">Supabase Configuration Missing</h1>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          The app cannot connect to the backend because the following environment variables are
          missing:
        </p>
        <ul className="mt-4 space-y-2">
          {missing.map((key) => (
            <li
              key={key}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm font-mono text-red-400"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
              {key}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg border border-[#00C805]/20 bg-[#00C805]/5 p-4 text-sm text-gray-300">
          <strong className="text-[#00C805]">Next step:</strong> Make sure Lovable Cloud / Supabase
          is enabled for this project, then trigger a fresh production build and publish. Do not
          hardcode credentials in source files.
        </div>
      </div>
    </div>
  );
}

function useSupabaseConfig() {
  const missing: string[] = [];
  const url = import.meta.env.VITE_SUPABASE_URL;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url) missing.push("VITE_SUPABASE_URL");
  if (!publishableKey) missing.push("VITE_SUPABASE_PUBLISHABLE_KEY");

  return { ok: missing.length === 0, missing };
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { ok, missing } = useSupabaseConfig();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      {ok ? <Outlet /> : <SupabaseConfigError missing={missing} />}
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
