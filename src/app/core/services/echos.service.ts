import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { environment } from '../environment/environment';


@Injectable({ providedIn: 'root' })
export class EchosService {
private supabase = inject(SupabaseService);


async getFeed(page: number){
const from = (page - 1) * environment.pageSize;
const to = from + environment.pageSize - 1;


return this.supabase.client
.from('ecos')
.select('*, usuario:usuario(username, avatar_url)')
.order('created_at', { ascending: false })
.range(from, to);
}


async getById(id: string){
return this.supabase.client
.from('ecos')
.select('*, usuario:usuario(username, avatar_url)')
.eq('id', id)
.single();
}


async createEcho(content: string, userId: string){
return this.supabase.client
.from('ecos')
.insert({ content, usuario_id: userId });
}
}