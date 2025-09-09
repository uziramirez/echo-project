import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  standalone: true,
  selector: 'app-signup-page',
  template: `
    <section class="container auth">
      <h1>Crear cuenta</h1>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
        <div class="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            [(ngModel)]="email"
            required
            email
            [class.invalid]="f.submitted && f.controls['email'].invalid" />
          @if (f.submitted && f.controls['email'].invalid) {
            <small class="error">Ingresa un email válido</small>
          }
        </div>

        <div class="field">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            [(ngModel)]="password"
            required
            minlength="6"
            [class.invalid]="f.submitted && f.controls['password'].invalid" />
          @if (f.submitted && f.controls['password'].invalid) {
            <small class="error">Mínimo 6 caracteres</small>
          }
        </div>

        @if (error()) {
          <p class="error">{{ error() }}</p>
        }

        <ui-button type="submit" [disabled]="loading()">Registrarme</ui-button>
      </form>

      @if (loading()) { <p class="muted">Creando cuenta…</p> }
    </section>
  `,
  imports: [CommonModule, FormsModule, ButtonComponent]
})
export class SignupPageComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit(f: NgForm) {
    this.error.set(null);
    if (f.invalid) return;

    this.loading.set(true);
    try {
      await this.auth.signup(this.email, this.password);
      // muchas apps redirigen a /login para confirmar email;
      // si en tu proyecto entras directo, deja '/'
      this.router.navigateByUrl('/login');
    } catch (e: any) {
      this.error.set(e?.message ?? 'No se pudo registrar');
    } finally {
      this.loading.set(false);
    }
  }
}
