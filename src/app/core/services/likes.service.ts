import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';


@Injectable({ providedIn: 'root' })
export class LikesService {
private supabase = inject(SupabaseService);


async toggleLike(echoId: string, userId: string){
const { data } = await this.supabase.client
.from('likes')
.select('*')
.eq('ecos_id', echoId)
.eq('usuario_id', userId)
.maybeSingle();


if(data){
return this.supabase.client
.from('likes')
.delete()
.eq('id', data.id);
} else {
return this.supabase.client
.from('likes')
.insert({ ecos_id: echoId, usuario_id: userId });
}
}


async getLikes(echoId: string){
return this.supabase.client
.from('likes')
.select('id')
.eq('ecos_id', echoId);
}
}
