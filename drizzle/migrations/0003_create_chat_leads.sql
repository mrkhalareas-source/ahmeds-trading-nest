CREATE TABLE public.chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  name text,
  whatsapp text,
  telegram text,
  interest text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id)
);
GRANT ALL ON public.chat_leads TO service_role;
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;