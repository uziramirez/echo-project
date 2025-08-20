import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Ecos } from '../models/ecos.model';

@Injectable({ providedIn: 'root' })
export class EchosService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://lkwzbetrjnozrmdntoeg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd3piZXRyam5venJtZG50b2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTk5MjIsImV4cCI6MjA3MDY5NTkyMn0.erKShL0Yd_PuOKkuc4sJUSZix5zeLD73AH9rhQ6i-LM');
  }

  async getEchos(page: number): Promise<Ecos[]> {
    const { data, error } = await this.supabase
      .from('echos')
      .select('*, usuario:profiles(username, avatar_url)')
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1);

    if (error) throw error;
    return data || [];
  }

 async getEchoById(id: string): Promise<Ecos | null> {
    const { data, error } = await this.supabase
      .from('echos')
      .select('*, usuario:profiles(username, avatar_url)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ?? null;
  }

  async likeEcho(echoId: string) {
    const { error } = await this.supabase.from('likes').insert({ echo_id: echoId });
    if (error) throw error;
  }

  async unlikeEcho(echoId: string) {
    const { error } = await this.supabase.from('likes').delete().eq('echo_id', echoId);
    if (error) throw error;
  }

  async getLikedEchos(userId: string): Promise<Ecos[]> {
  const { data, error } = await this.supabase
    .from('likes')
    .select('echo:echos(*, usuario:profiles(username, avatar_url))')
    .eq('user_id', userId);

  if (error) throw error;

  // el select anidado regresa { echo: { ... } }
  return (data || []).map((row: any) => row.echo);
}

}


