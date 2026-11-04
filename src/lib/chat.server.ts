import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai/run-id";

const GATEWAY_URL = "https://ai.gateway.lovable.dev";
const CHAT_MODEL = "openai/gpt-6-astra";

const SYSTEM_PROMPT = `You are the live assistant on the "Trade With Ahmed" website (tradewithahmed.site), a premium Forex & Gold (XAUUSD) trading mentorship platform by Ahmed Saleem.

Your job: answer visitor questions instantly, clearly and helpfully, in short conversational answers (2-5 sentences). Use markdown for lists when useful. Match the visitor's language (many visitors write in English or Roman Urdu).

What you know about the platform:
- Advance Course / Lifetime 1 to 1 Mentorship: $100 one-time payment, lifetime access. Institutional trading: SMC & ICT, Order Blocks, Fair Value Gaps, Fibonacci/OTE, BOS/CHOCH, liquidity sweeps, NY/London kill zones, XAUUSD (Gold) strategies, prop-firm risk models, VIP community with daily trade plans and live chart breakdowns.
- Official Trading Challenge ($500 Live Account) with 4 options, refundable entry fees paid in PKR:
  * Option 1 - Standard: $500 account, Rs. 2000 (100% refundable upon passing), profit target 10% ($50)
  * Option 2 - Flexible: $1000 account, Rs. 3000 (100% refundable upon passing), profit target 5% ($50)
  * Option 3 - Ultra-Easy: $1500 account, Rs. 4000 (100% refundable upon passing), profit target 3% ($50)
  * Option 4 - The Ultimate Challenge: $2000 account, Rs. 5000 (100% refundable upon passing), profit target 7% ($350)
  Pass the challenge and get the fee refunded plus the live account reward. Profit split on option cards: 65%.
- Premium Group membership plans: 1 Month Rs. 3,000; 3 Months Rs. 7,000; 6 Months Rs. 12,000 (daily trade plans, live signals and market breakdowns).
- Payment methods: Bank Alfalah IBAN PK56ALFH0100001004895493; Binance Pay ID 787567422; Binance wallet (TRC20) TExU5qQhTh1BKi5p7NwLvq1dRbPNBAjviS. After payment, send the transaction receipt screenshot to Admin via Telegram.
- Contact: Telegram @tradewithahmedofficial (https://t.me/tradewithahmedofficial) and WhatsApp +92 333 5359534 (https://wa.me/923335359534).
- Brokers mentioned on the site: Vantage, Exness, Doo Prime, XM, Binance, TradingView.

Rules:
- You are a support assistant. Do NOT give personal financial advice, price predictions, buy/sell calls, or trading signals in this chat. If asked, politely explain that trade setups and signals are shared in the Premium Group and mentorship, and point them to Telegram/WhatsApp.
- For enrollment, payments, receipts, refund questions or anything account-specific, direct the visitor to contact Admin directly on Telegram (https://t.me/tradewithahmedofficial) or WhatsApp (https://wa.me/923335359534) - you cannot process payments.
- Never invent prices, dates or account details. If unsure, say so and point to the contact channels.
- Keep it friendly and professional. Never mention which AI model or system powers you; you are the Trade With Ahmed assistant.

Lead capture:
- When a visitor shows interest in joining (mentorship, a challenge, Premium Group) or asks how to pay/enroll, naturally and politely ask for their name and WhatsApp number or Telegram username so Admin can follow up. Ask once; don't pressure them if they decline.
- As soon as the visitor shares a name, WhatsApp number or Telegram username, call the save_lead tool with everything known so far (use null for unknown fields), then thank them and confirm Admin will reach out.

Contact buttons:
- Whenever your reply is about enrolling, joining, paying, sending a receipt, or contacting Admin, end the reply with the exact token [[CONTACT_BUTTONS]] on its own line. The website turns it into WhatsApp and Telegram buttons. Never use it more than once per reply.`;

const textPartSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
  state: z.string().optional(),
});

const chatPostSchema = z.object({
  visitorToken: z
    .string()
    .min(8)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/, "invalid visitor token"),
  conversationId: z.string().uuid(),
  messages: z
    .array(
      z.object({
        id: z.string().min(1).max(120),
        role: z.enum(["user", "assistant"]),
        parts: z.array(textPartSchema).min(1).max(30),
      }),
    )
    .min(1)
    .max(60),
});

const chatGetSchema = z.object({
  visitorToken: z
    .string()
    .min(8)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/, "invalid visitor token"),
  conversationId: z.string().uuid(),
});

function messageText(message: Pick<UIMessage, "parts">): string {
  return message.parts
    .map((part) =>
      part.type === "text" && typeof part.text === "string" ? part.text : "",
    )
    .join("")
    .trim();
}

// The wire format is validated with zod, but the AI SDK helpers expect the
// SDK's UIMessage shape — keep only text parts and rebuild typed messages.
function toUiMessages(
  parsed: z.infer<typeof chatPostSchema>["messages"],
): UIMessage[] {
  return parsed.map((message) => ({
    id: message.id,
    role: message.role,
    parts: message.parts
      .filter(
        (part): part is { type: "text"; text: string } =>
          part.type === "text" && typeof part.text === "string",
      )
      .map((part) => ({ type: "text" as const, text: part.text })),
  }));
}

type AdminClient = Awaited<ReturnType<typeof getAdminClient>>;

async function getAdminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

async function resolveSession(
  admin: AdminClient,
  conversationId: string,
  visitorToken: string,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const { data: existing, error: selectError } = await admin
    .from("chat_sessions")
    .select("id, visitor_token")
    .eq("id", conversationId)
    .maybeSingle();

  if (selectError) {
    console.error("[chat] session lookup failed", selectError);
    return { ok: false, status: 500, message: "Could not load the chat. Please try again." };
  }

  if (existing) {
    if (existing.visitor_token !== visitorToken) {
      return { ok: false, status: 403, message: "This chat does not belong to you." };
    }
    return { ok: true };
  }

  const { error: insertError } = await admin
    .from("chat_sessions")
    .insert({ id: conversationId, visitor_token: visitorToken });

  if (insertError && insertError.code !== "23505") {
    console.error("[chat] session create failed", insertError);
    return { ok: false, status: 500, message: "Could not start the chat. Please try again." };
  }

  return { ok: true };
}

export async function handleChatGet(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = chatGetSchema.safeParse({
    visitorToken: url.searchParams.get("visitorToken") ?? undefined,
    conversationId: url.searchParams.get("conversationId") ?? undefined,
  });
  if (!parsed.success) {
    return errorResponse("Invalid request.", 400);
  }

  const admin = await getAdminClient();
  const session = await resolveSession(admin, parsed.data.conversationId, parsed.data.visitorToken);
  if (!session.ok) return errorResponse(session.message, session.status);

  const { data: rows, error } = await admin
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("session_id", parsed.data.conversationId)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[chat] history load failed", error);
    return errorResponse("Could not load the chat history.", 500);
  }

  const messages: UIMessage[] = (rows ?? []).map((row) => ({
    id: row.id,
    role: row.role as "user" | "assistant",
    parts: [{ type: "text", text: row.content }],
  }));

  return Response.json({ conversationId: parsed.data.conversationId, messages });
}

export async function handleChatPost(request: Request): Promise<Response> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("[chat] LOVABLE_API_KEY is missing");
    return errorResponse("The chat assistant is not configured yet. Please contact Admin on Telegram or WhatsApp.", 500);
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const parsed = chatPostSchema.safeParse(rawBody);
  if (!parsed.success) {
    return errorResponse("Invalid chat request.", 400);
  }
  const { visitorToken, conversationId } = parsed.data;
  const uiMessages = toUiMessages(parsed.data.messages);

  const lastUserMessage = [...uiMessages].reverse().find((m) => m.role === "user");
  const userText = lastUserMessage ? messageText(lastUserMessage) : "";
  if (!userText) {
    return errorResponse("Message is empty.", 400);
  }
  if (userText.length > 4000) {
    return errorResponse("Message is too long (max 4000 characters).", 400);
  }

  const admin = await getAdminClient();
  const session = await resolveSession(admin, conversationId, visitorToken);
  if (!session.ok) return errorResponse(session.message, session.status);

  // Persist the visitor's message immediately so it survives reloads even if
  // the stream is interrupted. Skip when the last stored row is identical.
  try {
    const { data: lastRow } = await admin
      .from("chat_messages")
      .select("role, content")
      .eq("session_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!lastRow || lastRow.role !== "user" || lastRow.content !== userText) {
      const { error: insertError } = await admin
        .from("chat_messages")
        .insert({ session_id: conversationId, role: "user", content: userText });
      if (insertError) throw insertError;
      await admin
        .from("chat_sessions")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversationId);
    }
  } catch (persistError) {
    console.error("[chat] user message persist failed", persistError);
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: `${GATEWAY_URL.replace(/\/+$/, "")}/v1`,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(CHAT_MODEL),
    instructions: SYSTEM_PROMPT,
    messages: await convertToModelMessages(uiMessages),
    abortSignal: request.signal,
    stopWhen: stepCountIs(3),
    tools: {
      save_lead: tool({
        description: "Save the visitor's contact details so Admin can follow up.",
        inputSchema: z.object({
          name: z.string().max(100).nullable(),
          whatsapp: z.string().max(40).nullable(),
          telegram: z.string().max(60).nullable(),
          interest: z.string().max(200).nullable().describe("What they want to join, e.g. Mentorship, Option 2 challenge"),
        }),
        execute: async (input) => {
          if (!input.whatsapp && !input.telegram && !input.name) return { saved: false };
          const { data: existing } = await admin
            .from("chat_leads")
            .select("name, whatsapp, telegram, interest")
            .eq("session_id", conversationId)
            .maybeSingle();
          const { error: leadError } = await admin.from("chat_leads").upsert(
            {
              session_id: conversationId,
              name: input.name ?? existing?.name ?? null,
              whatsapp: input.whatsapp ?? existing?.whatsapp ?? null,
              telegram: input.telegram ?? existing?.telegram ?? null,
              interest: input.interest ?? existing?.interest ?? null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "session_id" },
          );
          if (leadError) {
            console.error("[chat] lead save failed", leadError);
            return { saved: false };
          }
          return { saved: true };
        },
      }),
    },
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  // Only persist messages that are genuinely new — the stream result includes
  // the original history too, and re-saving it would duplicate old turns.
  const originalIds = new Set(uiMessages.map((message) => message.id));

  const response = result.toUIMessageStreamResponse({
    originalMessages: uiMessages,
    sendReasoning: true,
    onFinish: async ({ messages: newMessages }) => {
      try {
        for (const message of newMessages) {
          if (originalIds.has(message.id)) continue;
          const text = messageText(message);
          if (!text) continue;
          const { error: insertError } = await admin
            .from("chat_messages")
            .insert({ session_id: conversationId, role: message.role, content: text });
          if (insertError) throw insertError;
        }
        await admin
          .from("chat_sessions")
          .update({ last_message_at: new Date().toISOString() })
          .eq("id", conversationId);
      } catch (persistError) {
        console.error("[chat] assistant message persist failed", persistError);
      }
    },
  });

  return withLovableAiGatewayRunIdHeader(response, runIdFetch);
}
