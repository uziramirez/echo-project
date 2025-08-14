import { Usuario } from "./usuario.model";
/*create table public.likes (
  ecos_id uuid not null,
  usuario_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint likes_pkey primary key (ecos_id, usuario_id),
  constraint likes_ecos_id_fkey foreign KEY (ecos_id) references ecos (id) on delete CASCADE,
  constraint likes_usuario_id_fkey foreign KEY (usuario_id) references usuario (id) on delete CASCADE
) TABLESPACE pg_default;*/
export interface Likes {
  ecos_id: string;
  usuario_id: string; 
  created_at: string;         
  // Opcional
  usuario?: Usuario;
}