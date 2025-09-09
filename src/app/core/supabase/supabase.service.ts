import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';


@Injectable({ providedIn: 'root' })
export class SupabaseService {
client: SupabaseClient;
constructor(){
this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
}
}