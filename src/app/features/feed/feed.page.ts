import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchoCardComponent } from '../../../app/shared/echo-card/echo-card.component';
import { EchosService } from '../../core/services/echos.service';
import { Ecos } from '../../core/models/ecos.model';

@Component({
  standalone: true,
  selector: 'app-echos-page',
  template: `
    <section class="container">
      <h1>Últimos Ecos</h1>

      @if (loading()) {
        <p>Cargando...</p>
      }

      @if (!loading()) {
        @for (echo of echos(); track echo.id) {
          <ui-echo-card
            [echo]="echo"
            (onLike)="likeEcho(echo.id)"
            (onUnlike)="unlikeEcho(echo.id)"
          />
        } @empty {
          <p>No hay ecos disponibles.</p>
        }
      }

      <button (click)="loadMore()">Cargar más</button>
    </section>
  `,
  imports: [CommonModule, EchoCardComponent],
})
export class EchosPageComponent implements OnInit {
  echos = signal<Ecos[]>([]);
  loading = signal(false);
  page = signal(1);

  constructor(private echosService: EchosService) {}

  ngOnInit() {
    this.loadEchos();
  }

  loadEchos() {
    this.loading.set(true);
    this.echosService.getEchos(this.page()).then(data => {
      this.echos.update(current => [...current, ...data]);
      this.loading.set(false);
    });
  }

  loadMore() {
    this.page.update(p => p + 1);
    this.loadEchos();
  }

  likeEcho(id: string) {
    this.echosService.likeEcho(id).then(() => {
      this.refresh();
    });
  }

  unlikeEcho(id: string) {
    this.echosService.unlikeEcho(id).then(() => {
      this.refresh();
    });
  }

  refresh() {
    this.page.set(1);
    this.echos.set([]);
    this.loadEchos();
  }
}
