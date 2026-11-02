import { createFileRoute } from "@tanstack/react-router";
import { handleChatGet, handleChatPost } from "@/lib/chat.server";

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      GET: ({ request }) => handleChatGet(request),
      POST: ({ request }) => handleChatPost(request),
    },
  },
});
