import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';


@Injectable({ providedIn: 'root' })
export class CommentsService {
private supabase = inject(SupabaseService);


async getComments(echoId: string){
return this.supabase.client
.from('comentarios')
.select('*, usuario:usuario(username, avatar_url)')
.eq('ecos_id', echoId)
.order('created_at', { ascending: false });
}


async addComment(echoId: string, userId: string, content: string){
return this.supabase.client
.from('comentarios')
.insert({ ecos_id: echoId, usuario_id: userId, content });
}
}