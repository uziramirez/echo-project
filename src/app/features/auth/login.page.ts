import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ButtonComponent } from "../../shared/button/button.componet";

@Component({
  standalone: true,
  selector: 'app-login-page',
  template: `
    <section class="container">
      <h1>Iniciar Sesión</h1>
      <form (ngSubmit)="login()" #form="ngForm">
        <input type="email" name="email" [(ngModel)]="email" placeholder="Email" required />
        <input type="password" name="password" [(ngModel)]="password" placeholder="Contraseña" required />
        <ui-button type="submit" [disabled]="form.invalid ?? false">Entrar</ui-button>
      </form>
    </section>
  `,
  imports: [CommonModule, FormsModule, ButtonComponent]
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.router.navigate(['/']);
    });
  }
}
