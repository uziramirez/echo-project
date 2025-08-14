import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  /**
   * Iniciar sesión con email y contraseña
   */
  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
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
    const { data, error } = await this.supabaseService.client.auth.signUp({
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
    const { error } = await this.supabaseService.client.auth.signOut();
    if (error) throw error;
  }

  /**
   * Obtener usuario actual
   */
  getUser() {
    return this.supabaseService.client.auth.getUser();
  }

  /**
   * Escuchar cambios de sesión
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    this.supabaseService.client.auth.onAuthStateChange(callback);
  }
}
