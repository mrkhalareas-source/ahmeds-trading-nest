import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, LogOut, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listChatLeads, type ChatLeadRow } from "@/lib/leads.functions";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const CODE_STORAGE_KEY = "twa_admin_code";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Chat Leads — Admin | Trade With Ahmed" },
      { name: "description", content: "Private admin list of chat leads captured from the Trade With Ahmed live assistant." },
      { property: "og:title", content: "Chat Leads — Admin | Trade With Ahmed" },
      { property: "og:description", content: "Private admin list of chat leads captured from the Trade With Ahmed live assistant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLeadsPage,
});

function whatsappHref(raw: string | null): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  const normalized = digits.startsWith("0") ? `92${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

function telegramHref(raw: string | null): string | null {
  if (!raw) return null;
  const handle = raw.trim().replace(/^@/, "");
  if (!handle) return null;
  const url = handle.startsWith("http") ? handle : `https://t.me/${handle}`;
  try {
    return new URL(url).href;
  } catch {
    return null;
  }
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Karachi",
  });
}

function AdminLeadsPage() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [leads, setLeads] = useState<ChatLeadRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLeads = async (accessCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await listChatLeads({ data: { code: accessCode } });
      setLeads(result.leads);
      setUnlocked(true);
      sessionStorage.setItem(CODE_STORAGE_KEY, accessCode);
    } catch (err) {
      setUnlocked(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      sessionStorage.removeItem(CODE_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(CODE_STORAGE_KEY);
    if (saved) {
      setCode(saved);
      void loadLeads(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLock = () => {
    sessionStorage.removeItem(CODE_STORAGE_KEY);
    setCode("");
    setUnlocked(false);
    setLeads([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#E5B800]/15 text-[#E5B800]">
              <Users className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Chat Leads</h1>
              <p className="text-sm text-white/60">Visitors who shared their contact with Ahmed's Assistant</p>
            </div>
          </div>
          {unlocked && (
            <Button variant="outline" onClick={handleLock} className="border-white/15 bg-white/5 text-white hover:bg-white/10">
              <LogOut className="size-4" /> Lock
            </Button>
          )}
        </header>

        {!unlocked ? (
          <form
            className="mx-auto mt-16 max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            onSubmit={(event) => {
              event.preventDefault();
              if (code.trim()) void loadLeads(code.trim());
            }}
          >
            <div className="mb-4 flex items-center gap-2 text-[#E5B800]">
              <KeyRound className="size-4" />
              <span className="text-sm font-semibold">Admin access</span>
            </div>
            <label className="mb-2 block text-sm text-white/70" htmlFor="admin-code">
              Access code
            </label>
            <input
              id="admin-code"
              type="password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              autoComplete="off"
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none focus:border-[#E5B800]"
              placeholder="Enter your access code"
            />
            <Button
              type="submit"
              disabled={loading || !code.trim()}
              className="mt-4 w-full bg-[#E5B800] font-semibold text-[#0B0E14] hover:bg-[#f0c533]"
            >
              {loading ? "Checking…" : "Show leads"}
            </Button>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </form>
        ) : (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-white/60">
                {leads.length} {leads.length === 1 ? "lead" : "leads"}
              </p>
              <button
                type="button"
                onClick={() => void loadLeads(code.trim())}
                disabled={loading}
                className="text-sm font-medium text-[#E5B800] hover:underline disabled:opacity-50"
              >
                {loading ? "Refreshing…" : "Refresh"}
              </button>
            </div>

            {leads.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/60">
                No leads saved yet. When a visitor shares their name or contact in the chat, it appears here.
              </p>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/50">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">WhatsApp</th>
                      <th className="px-4 py-3">Telegram</th>
                      <th className="px-4 py-3">Interest</th>
                      <th className="px-4 py-3">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {leads.map((lead) => {
                      const wa = whatsappHref(lead.whatsapp);
                      const tg = telegramHref(lead.telegram);
                      return (
                        <tr key={lead.id} className="align-top">
                          <td className="px-4 py-3 font-medium">{lead.name || <span className="text-white/40">—</span>}</td>
                          <td className="px-4 py-3">
                            {wa ? (
                              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-green-400 hover:underline">
                                <WhatsAppIcon className="size-4" />
                                <span>{lead.whatsapp}</span>
                              </a>
                            ) : (
                              <span className="text-white/40">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {tg ? (
                              <a href={tg} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sky-400 hover:underline">
                                <Send className="size-4" />
                                <span>{lead.telegram}</span>
                              </a>
                            ) : (
                              <span className="text-white/40">—</span>
                            )}
                          </td>
                          <td className="max-w-xs px-4 py-3 text-white/80">{lead.interest || <span className="text-white/40">—</span>}</td>
                          <td className="px-4 py-3 text-white/50">{formatDate(lead.createdAt)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
