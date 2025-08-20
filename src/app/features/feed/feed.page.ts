import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchoCardComponent } from '../../shared/echo-card/echo-card.component';
import { ButtonComponent } from '../../shared/button/button.componet';
import { EchosService } from '../../core/services/echos.service';
import { Ecos } from '../../core/models/ecos.model';

@Component({
  standalone: true,
  selector: 'app-feed-page',
  template: `
    <section class="container">
      <h1>Feed</h1>

      @if (loading()) {
        <p>Cargando...</p>
      } @else {
        @for (echo of echos(); track echo.id) {
          <ui-echo-card
            [echo]="echo"
            [onLike]="likeEcho.bind(this, echo.id)"
            [onUnlike]="unlikeEcho.bind(this, echo.id)">
          </ui-echo-card>
        } @empty {
          <p>Sin publicaciones aún.</p>
        }
      }

      <div class="pager">
        <ui-button (click)="prev()" [disabled]="page() === 0">Anterior</ui-button>
        <ui-button (click)="next()">Siguiente</ui-button>
      </div>
    </section>
  `,
  imports: [CommonModule, EchoCardComponent, ButtonComponent],
})
export class FeedPageComponent implements OnInit {
  echos = signal<Ecos[]>([]);
  loading = signal(false);
  page = signal(0); // arrancamos en la página 0 (más intuitivo)

  constructor(private echosService: EchosService) {}

  ngOnInit() {
    this.loadPage();
  }

  async loadPage() {
    this.loading.set(true);
    try {
      const data = await this.echosService.getEchos(this.page() + 1); 
      this.echos.set(data); // cada página reemplaza la lista
    } finally {
      this.loading.set(false);
    }
  }

  async likeEcho(id: string) {
    await this.echosService.likeEcho(id);
    this.refresh();
  }

  async unlikeEcho(id: string) {
    await this.echosService.unlikeEcho(id);
    this.refresh();
  }

  prev() {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.loadPage();
    }
  }

  next() {
    this.page.update(p => p + 1);
    this.loadPage();
  }

  refresh() {
    this.loadPage(); // refresca la página actual
  }
}
