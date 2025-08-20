import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class LikesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://lkwzbetrjnozrmdntoeg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd3piZXRyam5venJtZG50b2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTk5MjIsImV4cCI6MjA3MDY5NTkyMn0.erKShL0Yd_PuOKkuc4sJUSZix5zeLD73AH9rhQ6i-LM'
    );
  }

  async like(echoId: string, userId: string) {
    const { error } = await this.supabase.from('likes').insert({
      echo_id: echoId,
      user_id: userId,
    });
    if (error) throw error;
  }

  async unlike(echoId: string, userId: string) {
    const { error } = await this.supabase
      .from('likes')
      .delete()
      .eq('echo_id', echoId)
      .eq('user_id', userId);

    if (error) throw error;
  }
}
