import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  client = createClient(environment.supabaseUrl,
environment.supabaseAnonKey);
}