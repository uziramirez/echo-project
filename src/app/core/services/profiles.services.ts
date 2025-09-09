import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';


@Injectable({ providedIn: 'root' })
export class ProfilesService {
private supabase = inject(SupabaseService);


async getProfile(username: string){
return this.supabase.client
.from('usuario')
.select('*')
.eq('username', username)
.single();
}


async updateProfile(userId: string, data: { username?: string; avatar_url?: string }){
return this.supabase.client
.from('usuario')
.update(data)
.eq('id', userId);
}
}