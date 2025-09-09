import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DatePipe } from '@angular/common';
import { Ecos } from '../../core/models/ecos.model';

@Component({
  standalone: true,
  selector: 'ui-echo-card',
  template: `
    <article class="card">
      <header>
        @if (echo.usuario?.avatar_url) {
          <img [src]="echo.usuario?.avatar_url" class="avatar" alt="" />
        }
        <strong>@{{ echo.usuario?.username }}</strong>
        <time class="muted">{{ echo.created_at | date:'short' }}</time>
      </header>

      <p>{{ echo.description }}</p>

      @if (echo.imagen) {
        <img [src]="echo.imagen" class="w-full" alt="" />
      }

      <footer class="row">
        <ui-button (click)="onLike?.()">👍 Like</ui-button>
        <ui-button (click)="onUnlike?.()">👎 Quitar</ui-button>
      </footer>
    </article>
  `,
  imports: [ButtonComponent, DatePipe],
})
export class EchoCardComponent {
  @Input() echo!: Ecos;
  @Input() onLike?: () => void;
  @Input() onUnlike?: () => void;
}
