/*

create table public.ecos (
  id uuid not null,
  usuario_id uuid not null,
  description text not null,
  imagen text null,
  created_at timestamp with time zone null default now(),
  constraint ecos_pkey primary key (id),
  constraint ecos_usuario_id_fkey foreign KEY (usuario_id) references usuario (id) on delete CASCADE
) TABLESPACE pg_default;

*/

import { Comentarios } from "./comentarios.model";
import { Usuario } from "./usuario.model";

export interface Ecos {
  id: string;
  usuario_id: string;
  description: string;
  imagen?: string;
  created_at: string;
  // Opcional
  usuario?: Usuario;
  comentarios?: Comentarios[];
  likes_count?: number;
  comments_count?: number;
}