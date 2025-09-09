import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';


@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet],
template: `<router-outlet />`
})
export class App {
private auth = inject(AuthService);
constructor(){
// Inicializa sesión de Supabase al arrancar
this.auth.initSession();
}
}