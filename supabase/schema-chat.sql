-- ============================================================
-- SellOS Chat Schema — chạy trong Supabase SQL Editor
-- ============================================================

create table conversations (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  title       text not null default 'Cuộc trò chuyện mới',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger tr_conversations_updated_at
  before update on conversations
  for each row execute function update_updated_at();

create table messages (
  id                uuid primary key default uuid_generate_v4(),
  conversation_id   uuid not null references conversations(id) on delete cascade,
  role              text not null check (role in ('user', 'assistant')),
  content           text not null,
  created_at        timestamptz not null default now()
);

-- Index để load messages nhanh
create index idx_messages_conversation_id on messages(conversation_id);
create index idx_conversations_user_id on conversations(user_id);

-- RLS
alter table conversations enable row level security;
alter table messages      enable row level security;

create policy "users_own_conversations" on conversations
  for all using (
    user_id in (
      select id from profiles
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "users_own_messages" on messages
  for all using (
    conversation_id in (
      select c.id from conversations c
      join profiles p on p.id = c.user_id
      where p.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );
