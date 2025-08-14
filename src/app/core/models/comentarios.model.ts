/*
create table public.comentarios (
  id uuid not null,
  ecos_id uuid not null,
  usuario_id uuid not null,
  comentario text not null,
  created_at timestamp with time zone null default now(),
  constraint comentarios_pkey primary key (id),
  constraint comentarios_ecos_id_fkey foreign KEY (ecos_id) references ecos (id) on delete CASCADE,
  constraint comentarios_usuario_id_fkey foreign KEY (usuario_id) references usuario (id) on delete CASCADE
) TABLESPACE pg_default;
*/

import { Usuario } from "./usuario.model";


export interface Comentarios {
  id: string;
  ecos_id: string;
  usuario_id: string;
  comentario: string;   
  created_at: string; 

  // Opcional
  usuario?: Usuario;
}