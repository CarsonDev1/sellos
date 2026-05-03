-- ============================================================
-- SellOS schema v2: Website Generator
-- Run this in Supabase SQL Editor after schema.sql
-- ============================================================

-- Update projects table
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS template_id      text,
  ADD COLUMN IF NOT EXISTS generated_content jsonb,
  ADD COLUMN IF NOT EXISTS slug             text unique,
  ADD COLUMN IF NOT EXISTS published        boolean not null default false;

-- ============================================================
-- project_products: sản phẩm của website được generate
-- ============================================================
create table if not exists project_products (
  id             uuid primary key default uuid_generate_v4(),
  project_id     uuid not null references projects(id) on delete cascade,
  name           text not null,
  slug           text,
  description    text,
  price          integer,
  original_price integer,
  image_url      text,
  images         text[] default '{}',
  category       text,
  badge          text,
  sizes          text[] default '{}',
  colors         text[] default '{}',
  stock          integer default 0,
  available      boolean default true,
  sort_order     integer default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger tr_project_products_updated_at
  before update on project_products
  for each row execute function update_updated_at();

-- ============================================================
-- project_orders: đơn hàng (shop-online + thuc-pham)
-- ============================================================
create table if not exists project_orders (
  id               uuid primary key default uuid_generate_v4(),
  project_id       uuid not null references projects(id) on delete cascade,
  order_number     text unique,
  customer_name    text,
  customer_phone   text,
  customer_address text,
  customer_note    text,
  items            jsonb default '[]',
  subtotal         integer default 0,
  discount         integer default 0,
  total            integer default 0,
  payment_method   text,
  status           text not null default 'pending'
                   check (status in ('pending','confirmed','shipping','done','cancelled')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger tr_project_orders_updated_at
  before update on project_orders
  for each row execute function update_updated_at();

-- ============================================================
-- project_bookings: đặt lịch tư vấn (coaching)
-- ============================================================
create table if not exists project_bookings (
  id             uuid primary key default uuid_generate_v4(),
  project_id     uuid not null references projects(id) on delete cascade,
  client_name    text,
  client_phone   text,
  client_email   text,
  program_name   text,
  preferred_time text,
  message        text,
  status         text not null default 'pending'
                 check (status in ('pending','confirmed','done','cancelled')),
  created_at     timestamptz not null default now()
);

-- ============================================================
-- project_testimonials: đánh giá (editable per project)
-- ============================================================
create table if not exists project_testimonials (
  id         uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  name       text,
  role       text,
  quote      text,
  rating     integer default 5,
  avatar_url text,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_project_products_project_id on project_products(project_id);
create index if not exists idx_project_orders_project_id   on project_orders(project_id);
create index if not exists idx_project_bookings_project_id on project_bookings(project_id);
create index if not exists idx_project_testimonials_project_id on project_testimonials(project_id);
create index if not exists idx_projects_slug               on projects(slug);

-- ============================================================
-- RLS
-- ============================================================
alter table project_products    enable row level security;
alter table project_orders      enable row level security;
alter table project_bookings    enable row level security;
alter table project_testimonials enable row level security;

-- project_products: owner của project mới được quản lý
create policy "owner manages project_products" on project_products
  for all using (
    project_id in (
      select p.id from projects p
      join profiles pr on pr.id = p.user_id
      where pr.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

-- Public read cho products của published projects
create policy "public reads published products" on project_products
  for select using (
    project_id in (select projects.id from projects where projects.published = true)
  );

-- project_orders
create policy "owner manages orders" on project_orders
  for all using (
    project_id in (
      select p.id from projects p
      join profiles pr on pr.id = p.user_id
      where pr.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

-- Public insert orders (khách đặt hàng)
create policy "public inserts orders" on project_orders
  for insert with check (
    project_id in (select projects.id from projects where projects.published = true)
  );

-- project_bookings
create policy "owner manages bookings" on project_bookings
  for all using (
    project_id in (
      select p.id from projects p
      join profiles pr on pr.id = p.user_id
      where pr.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "public inserts bookings" on project_bookings
  for insert with check (
    project_id in (select projects.id from projects where projects.published = true)
  );

-- project_testimonials
create policy "owner manages testimonials" on project_testimonials
  for all using (
    project_id in (
      select p.id from projects p
      join profiles pr on pr.id = p.user_id
      where pr.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "public reads testimonials" on project_testimonials
  for select using (
    project_id in (select projects.id from projects where projects.published = true)
  );
