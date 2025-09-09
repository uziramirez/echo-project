import { signal, Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
private userSig = signal<any | null>(null);
user = this.userSig.asReadonly();


constructor(private supabase: SupabaseService) {}

  async initSession(){
    const { data: { session } } = await this.supabase.client.auth.getSession();
    this.userSig.set(session?.user ?? null);
    this.supabase.client.auth.onAuthStateChange((_ev, s) => {
    this.userSig.set(s?.user ?? null);
    });
  }


  isAuthenticated(){
    return !!this.userSig();
    }


  getUserId(){
    return this.userSig()?.id ?? null;
    }
  /**
   * Iniciar sesión con email y contraseña
   */
  async login(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  /**
   * Registrarse con email y contraseña
   */
  async signup(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signUp({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    const { error } = await this.supabase.client.auth.signOut();
    if (error) throw error;
  }


  /**
   * Saber si hay sesión activa
   */
  

  /**
   * Obtener usuario actual
   */
  getUser() {
    return this.supabase.client.auth.getUser();
  }

  /**
   * Escuchar cambios de sesión
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    this.supabase.client.auth.onAuthStateChange(callback);
  }
}
