import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://lkwzbetrjnozrmdntoeg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd3piZXRyam5venJtZG50b2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTk5MjIsImV4cCI6MjA3MDY5NTkyMn0.erKShL0Yd_PuOKkuc4sJUSZix5zeLD73AH9rhQ6i-LM'
    );
  }

  async getProfile(id: string): Promise<Usuario | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getProfileByUsername(username: string): Promise<Usuario | null> {
  const { data, error } = await this.supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) throw error;
  return data;
}


  async updateProfile(id: string, partial: Partial<Usuario>) {
    const { error } = await this.supabase
      .from('profiles')
      .update(partial)
      .eq('id', id);

    if (error) throw error;
  }
}
