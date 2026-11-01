create table public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_token text not null,
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index chat_messages_session_created_idx on public.chat_messages (session_id, created_at);
create index chat_sessions_visitor_idx on public.chat_sessions (visitor_token, last_message_at desc);

grant all on public.chat_sessions to service_role;
grant all on public.chat_messages to service_role;

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

comment on table public.chat_sessions is 'Live-chat widget conversations; one session per site visitor, scoped by visitor_token';
comment on table public.chat_messages is 'Live-chat widget messages for public.chat_sessions';