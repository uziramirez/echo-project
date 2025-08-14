/*
create table public.usuario (
  id uuid not null,
  username text not null,
  avatar text null,
  created_at timestamp with time zone null default now(),
  constraint usuario_pkey primary key (id),
  constraint usuario_username_key unique (username),
  constraint usuario_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

*/

import { Ecos } from "./ecos.model";

export interface Usuario {
  id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  // Opcional
  ecos?: Ecos[];
}