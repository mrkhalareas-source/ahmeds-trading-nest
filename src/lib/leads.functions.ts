import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type ChatLeadRow = {
  id: string;
  name: string | null;
  whatsapp: string | null;
  telegram: string | null;
  interest: string | null;
  createdAt: string;
};

const accessSchema = z.object({
  code: z.string().min(4).max(200),
});

export const listChatLeads = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => accessSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_ACCESS_CODE"];
    if (!expected) {
      console.error("[admin-leads] ADMIN_ACCESS_CODE is not configured");
      throw new Error("Admin access is not configured yet.");
    }
    if (data.code !== expected) {
      throw new Error("Incorrect access code.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("chat_leads")
      .select("id, name, whatsapp, telegram, interest, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("[admin-leads] fetch failed", error.message);
      throw new Error("Could not load leads. Please try again.");
    }

    const leads: ChatLeadRow[] = (rows ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      whatsapp: row.whatsapp,
      telegram: row.telegram,
      interest: row.interest,
      createdAt: row.created_at,
    }));

    return { leads };
  });
