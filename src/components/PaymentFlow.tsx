import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { submitPaymentConfirmation, confirmationSchema } from "@/lib/payments.functions";

export const PACKAGES = [
  { id: "basic-course", name: "Basic Course", price: "Rs.5000" },
  { id: "mentorship", name: "Lifetime 1 to 1 Mentorship", price: "$100" },
  { id: "challenge-standard", name: "Trading Challenge – Standard", price: "Rs.2000" },
  { id: "challenge-flexible", name: "Trading Challenge – Flexible", price: "Rs.3000" },
  { id: "challenge-ultra", name: "Trading Challenge – Ultra-Easy", price: "Rs.4000" },
];

const METHODS = ["Bank Alfalah", "Binance Pay / ID", "Binance Wallet (TRC20)"];

const STEPS = [
  "Choose your package below.",
  "Pay the exact amount using one of the payment methods.",
  "Copy the transaction ID / reference from your receipt.",
  "Submit the confirmation form — Admin will verify and add you.",
];

export function PaymentSteps({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <div className="panel p-6">
        <h3 className="font-display text-lg font-bold">How to pay</h3>
        <ol className="mt-4 space-y-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-muted-foreground">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="panel p-6">
        <h3 className="font-display text-lg font-bold">1. Choose your package</h3>
        <div className="mt-4 grid gap-2">
          {PACKAGES.map((p) => {
            const active = p.id === selected;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  active ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="font-semibold">{p.name}</span>
                <span className="font-mono font-bold text-primary">{p.price}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PaymentConfirmationForm({ selected }: { selected: string }) {
  const pkg = PACKAGES.find((p) => p.id === selected) ?? PACKAGES[0]!;
  const [form, setForm] = useState({ full_name: "", contact: "", payment_method: "", transaction_id: "", notes: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, package: pkg.name, amount: pkg.price };
    const parsed = confirmationSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    try {
      await submitPaymentConfirmation({ data: parsed.data });
      setDone(true);
      toast.success("Payment confirmation received!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const input = "w-full rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  if (done) {
    return (
      <div className="panel mt-8 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="mt-3 font-display text-xl font-bold">Thank you, we received your confirmation</h3>
        <p className="mt-2 text-sm text-muted-foreground">Admin will verify your payment and contact you.</p>
        <Button variant="outline" className="mt-5" onClick={() => { setDone(false); setForm({ full_name: "", contact: "", payment_method: "", transaction_id: "", notes: "" }); }}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel mt-8 p-6">
      <h3 className="font-display text-lg font-bold">Confirm your payment</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Package: <span className="font-semibold text-foreground">{pkg.name}</span> —{" "}
        <span className="font-mono font-bold text-primary">{pkg.price}</span>
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <input className={input} placeholder="Full name" maxLength={100} value={form.full_name} onChange={set("full_name")} />
        <input className={input} placeholder="WhatsApp number or Telegram @username" maxLength={100} value={form.contact} onChange={set("contact")} />
        <select className={input} value={form.payment_method} onChange={set("payment_method")}>
          <option value="">Payment method used</option>
          {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input className={input} placeholder="Transaction ID / reference" maxLength={120} value={form.transaction_id} onChange={set("transaction_id")} />
        <textarea className={`${input} sm:col-span-2`} rows={3} placeholder="Notes (optional)" maxLength={500} value={form.notes} onChange={set("notes")} />
      </div>
      <Button type="submit" disabled={busy} className="mt-5 w-full sm:w-auto">
        {busy ? "Submitting..." : "Submit Payment Confirmation"}
      </Button>
    </form>
  );
}
