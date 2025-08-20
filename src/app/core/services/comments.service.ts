import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Comentarios } from '../models/comentarios.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://lkwzbetrjnozrmdntoeg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd3piZXRyam5venJtZG50b2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTk5MjIsImV4cCI6MjA3MDY5NTkyMn0.erKShL0Yd_PuOKkuc4sJUSZix5zeLD73AH9rhQ6i-LM'
    );
  }

  async list(echoId: string): Promise<Comentarios[]> {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*, usuario:profiles(username, avatar_url)')
      .eq('echo_id', echoId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async add(echoId: string, userId: string, content: string) {
    const { error } = await this.supabase.from('comments').insert({
      echo_id: echoId,
      user_id: userId,
      content,
    });

    if (error) throw error;
  }
}
