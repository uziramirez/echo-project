import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  template: `
  <router-outlet />
    <h1>{{ title() }}</h1>    `,
})
export class App {
  protected readonly title = signal('echo-app');
  constructor() { }
}
