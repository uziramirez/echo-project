import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ButtonComponet } from '../../shared/button/button.componet';

@Component({
  standalone: true,
  selector: 'app-login-page',
  template: `
    <section class="container auth">
      <h1>Iniciar sesión</h1>

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

        <ui-button type="submit" [disabled]="loading()">Entrar</ui-button>
      </form>

      @if (loading()) { <p class="muted">Validando…</p> }
    </section>
  `,
  imports: [CommonModule, FormsModule, ButtonComponet]
})
export class LoginPageComponent {
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
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/'); // cambia a '/feed' si esa es tu home
    } catch (e: any) {
      this.error.set(e?.message ?? 'No se pudo iniciar sesión');
    } finally {
      this.loading.set(false);
    }
  }
}
