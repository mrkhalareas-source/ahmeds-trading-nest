import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const confirmationSchema = z.object({
  full_name: z.string().trim().min(1, "Enter your name").max(100),
  contact: z.string().trim().min(3, "Enter your WhatsApp or Telegram").max(100),
  package: z.string().trim().min(1).max(100),
  amount: z.string().trim().min(1).max(50),
  payment_method: z.string().trim().min(1, "Choose a payment method").max(60),
  transaction_id: z.string().trim().min(3, "Enter the transaction ID").max(120),
  notes: z.string().trim().max(500).optional(),
});

export const submitPaymentConfirmation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => confirmationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("payment_confirmations")
      .insert({ ...data, notes: data.notes || null });
    if (error) {
      console.error("payment confirmation insert failed", error.message);
      throw new Error("Could not submit. Please try again or message us on Telegram.");
    }
    return { ok: true };
  });
