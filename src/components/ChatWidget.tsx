import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircleMore, Send, X } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const TELEGRAM_URL = "https://t.me/tradewithahmedofficial";
const WHATSAPP_URL = "https://wa.me/923335359534";

const VISITOR_KEY = "twa_chat_visitor";
const CONVO_KEY = "twa_chat_conversation";

const SUGGESTIONS = [
  "What do the courses cost?",
  "How do the trading challenges work?",
  "What payment methods do you accept?",
];

const GREETING: UIMessage = {
  id: "twa-greeting",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Assalam-o-Alaikum! 👋 I'm the Trade With Ahmed assistant. Ask me anything about the mentorship course, trading challenges, Premium Group plans or payments — I reply instantly. For enrollment, reach Admin directly on Telegram or WhatsApp below.",
    },
  ],
};

function randomToken(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function readIdentity(): { visitorToken: string; conversationId: string } {
  let visitorToken = window.localStorage.getItem(VISITOR_KEY) ?? "";
  if (!visitorToken) {
    visitorToken = randomToken();
    window.localStorage.setItem(VISITOR_KEY, visitorToken);
  }
  let conversationId = window.localStorage.getItem(CONVO_KEY) ?? "";
  if (!conversationId || !/^[0-9a-f-]{36}$/i.test(conversationId)) {
    conversationId = crypto.randomUUID();
    window.localStorage.setItem(CONVO_KEY, conversationId);
  }
  return { visitorToken, conversationId };
}

function AgentMark({ className }: { className?: string }) {
  return (
    <span
      className={`grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#E5B800] to-[#a07f00] shadow-[0_0_18px_-4px_rgba(229,184,0,0.7)] ${className ?? ""}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <g fill="#0B0E14">
          <rect x="4" y="9" width="4" height="9" rx="1" />
          <rect x="5.5" y="5" width="1" height="14" rx="0.5" />
          <rect x="10" y="5" width="4" height="8" rx="1" />
          <rect x="11.5" y="3" width="1" height="18" rx="0.5" />
          <rect x="16" y="11" width="4" height="8" rx="1" />
          <rect x="17.5" y="8" width="1" height="13" rx="0.5" />
        </g>
      </svg>
    </span>
  );
}

function ChatPanel({
  initialMessages,
  visitorToken,
  conversationId,
  onClose,
}: {
  initialMessages: UIMessage[];
  visitorToken: string;
  conversationId: string;
  onClose: () => void;
}) {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/public/chat",
        body: () => ({ visitorToken, conversationId }),
      }),
    [visitorToken, conversationId],
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: initialMessages,
  });

  const busy = status === "submitted" || status === "streaming";

  const handleSubmit = useCallback(
    (message: { text?: string; files?: unknown[] }) => {
      const text = message.text?.trim();
      if (!text || busy) return;
      void sendMessage({ text });
    },
    [sendMessage, busy],
  );

  return (
    <div
      className="fixed bottom-24 right-4 z-[110] flex h-[min(600px,72vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-primary/30 bg-[#0B0E14]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:bottom-24 sm:right-6"
      role="dialog"
      aria-label="Live chat with Trade With Ahmed"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-background/60 px-4 py-3">
        <AgentMark />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-foreground">Trade With Ahmed</p>
          <p className="flex items-center gap-1.5 text-[11px] text-accent">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#00C805] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#00C805]" />
            </span>
            Live Assistant · Online
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Transcript */}
      <Conversation className="flex-1 bg-transparent">
        <ConversationContent className="gap-5 px-4 py-4">
          {messages.map((message) => {
            const text = message.parts
              .filter((part) => part.type === "text" && typeof part.text === "string")
              .map((part) => part.text)
              .join("");
            return (
              <Message key={message.id} from={message.role}>
                <MessageContent
                  className={
                    message.role === "user"
                      ? "group-[.is-user]:rounded-xl group-[.is-user]:bg-primary group-[.is-user]:px-4 group-[.is-user]:py-2.5 group-[.is-user]:font-medium group-[.is-user]:text-[#0B0E14]"
                      : ""
                  }
                >
                  <MessageResponse className="text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_code]:text-accent">
                    {text}
                  </MessageResponse>
                </MessageContent>
              </Message>
            );
          })}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer className="text-sm text-muted-foreground" duration={1.4}>
                  Thinking...
                </Shimmer>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Error line */}
      {error && (
        <p className="mx-4 mb-1 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error.message || "Something went wrong. Please try again."}
        </p>
      )}

      {/* Quick suggestions */}
      {messages.length <= 1 && !busy && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSubmit({ text: s })}
              className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:border-accent hover:bg-accent/20"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <div className="border-t border-border bg-background/60 px-3 py-3">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            placeholder="Ask about courses, challenges, payments..."
            className="min-h-11 text-sm"
            rows={1}
          />
          <PromptInputFooter className="justify-between">
            <div className="flex items-center gap-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Admin on Telegram"
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-[11px] font-semibold text-cyan transition-colors hover:bg-cyan/20"
              >
                <Send className="size-3" /> Telegram
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#00C805]/40 bg-[#00C805]/10 px-3 py-1 text-[11px] font-semibold text-[#00C805] transition-colors hover:bg-[#00C805]/20"
              >
                <WhatsAppIcon className="size-3" /> WhatsApp
              </a>
            </div>
            <PromptInputSubmit
              status={status}
              disabled={!busy && status !== "ready"}
              className="bg-primary text-[#0B0E14] hover:bg-primary/90"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [initialMessages, setInitialMessages] = useState<UIMessage[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const identityRef = useRef<{ visitorToken: string; conversationId: string } | null>(null);

  useEffect(() => {
    if (!open || identityRef.current) return;
    identityRef.current = readIdentity();
  }, [open]);

  useEffect(() => {
    if (!open || initialMessages || loadFailed || !identityRef.current) return;
    let cancelled = false;
    const id = identityRef.current;
    (async () => {
      try {
        const res = await fetch(
          `/api/public/chat?visitorToken=${encodeURIComponent(id.visitorToken)}&conversationId=${encodeURIComponent(id.conversationId)}`,
        );
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = (await res.json()) as { messages?: UIMessage[] };
        if (!cancelled) {
          setInitialMessages(Array.isArray(data.messages) && data.messages.length > 0 ? [GREETING, ...data.messages] : [GREETING]);
        }
      } catch (err) {
        console.error("[chat-widget] history load failed", err);
        if (!cancelled) {
          setLoadFailed(true);
          setInitialMessages([GREETING]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, initialMessages, loadFailed]);

  return (
    <>
      {open && initialMessages && identityRef.current && (
        <ChatPanel
          initialMessages={initialMessages}
          visitorToken={identityRef.current.visitorToken}
          conversationId={identityRef.current.conversationId}
          onClose={() => setOpen(false)}
        />
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close live chat" : "Open live chat"}
        className="fixed bottom-6 right-4 z-[110] grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#E5B800] to-[#a07f00] text-[#0B0E14] shadow-[0_0_30px_-6px_rgba(229,184,0,0.8)] transition-transform hover:scale-105 active:scale-95 sm:right-6"
      >
        {open ? <X className="size-6" /> : <MessageCircleMore className="size-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-[#0B0E14] bg-[#00C805]" />
        )}
      </button>
    </>
  );
}
