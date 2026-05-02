-- ============================================================
-- SellOS Database Schema
-- Chạy file này trong Supabase Dashboard > SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role as enum ('admin', 'user');
create type business_type as enum ('khoa-hoc', 'shop-online', 'dich-vu', 'coaching', 'khac');
create type project_status as enum ('draft', 'active', 'paused');

-- ============================================================
-- PROFILES (sync với Clerk user)
-- ============================================================
create table profiles (
  id          uuid primary key default uuid_generate_v4(),
  clerk_id    text unique not null,
  email       text not null,
  full_name   text,
  avatar_url  text,
  role        user_role not null default 'user',
  onboarding_done boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Set admin role cho buitritinht@gmail.com ngay khi tạo profile
create or replace function set_admin_role()
returns trigger as $$
begin
  if new.email = 'buitritinht@gmail.com' then
    new.role = 'admin';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger tr_set_admin_role
  before insert or update on profiles
  for each row execute function set_admin_role();

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tr_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- ============================================================
-- BUSINESS INFO (thông tin doanh nghiệp của user)
-- ============================================================
create table business_info (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  brand_name    text not null,
  business_type business_type not null,
  description   text,
  phone         text,
  website       text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(user_id)
);

create trigger tr_business_info_updated_at
  before update on business_info
  for each row execute function update_updated_at();

-- ============================================================
-- PRODUCTS (sản phẩm / dịch vụ của user)
-- ============================================================
create table products (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  name            text not null,
  description     text,
  price           numeric(15, 0),
  usp             text,
  target_audience text,
  sales_channels  text[] not null default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger tr_products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- ============================================================
-- PROJECTS (các dự án / template đang dùng)
-- ============================================================
create table projects (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  name          text not null,
  template_type text,
  status        project_status not null default 'draft',
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger tr_projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
alter table profiles     enable row level security;
alter table business_info enable row level security;
alter table products      enable row level security;
alter table projects      enable row level security;

-- profiles: user chỉ đọc/sửa profile của mình; admin đọc tất cả
create policy "users_own_profile" on profiles
  for all using (clerk_id = current_setting('app.clerk_user_id', true));

create policy "admin_read_all_profiles" on profiles
  for select using (
    exists (
      select 1 from profiles p
      where p.clerk_id = current_setting('app.clerk_user_id', true)
      and p.role = 'admin'
    )
  );

-- business_info: chỉ owner
create policy "users_own_business_info" on business_info
  for all using (
    user_id in (
      select id from profiles
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "admin_read_all_business_info" on business_info
  for select using (
    exists (
      select 1 from profiles p
      where p.clerk_id = current_setting('app.clerk_user_id', true)
      and p.role = 'admin'
    )
  );

-- products: chỉ owner
create policy "users_own_products" on products
  for all using (
    user_id in (
      select id from profiles
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "admin_read_all_products" on products
  for select using (
    exists (
      select 1 from profiles p
      where p.clerk_id = current_setting('app.clerk_user_id', true)
      and p.role = 'admin'
    )
  );

-- projects: chỉ owner
create policy "users_own_projects" on projects
  for all using (
    user_id in (
      select id from profiles
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "admin_read_all_projects" on projects
  for select using (
    exists (
      select 1 from profiles p
      where p.clerk_id = current_setting('app.clerk_user_id', true)
      and p.role = 'admin'
    )
  );
