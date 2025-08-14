import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup-page',
  template: `
    <section class="container">
      <h1>Registro</h1>
      <form (ngSubmit)="signup()" #form="ngForm">
        <input type="email" name="email" [(ngModel)]="email" placeholder="Email" required />
        <input type="password" name="password" [(ngModel)]="password" placeholder="Contraseña" required minlength="6" />
        <button type="submit" [disabled]="form.invalid">Registrarse</button>
      </form>
    </section>
  `,
  imports: [CommonModule, FormsModule]
})
export class SignupPageComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.email, this.password).then(() => {
      this.router.navigate(['/']);
    });
  }
}
