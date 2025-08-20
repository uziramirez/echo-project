import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchoCardComponent } from '../../shared/echo-card/echo-card.component';
import { EchosService } from '../../core/services/echos.service';
import { AuthService } from '../../core/auth/auth.service';
import { Ecos } from '../../core/models/ecos.model';

@Component({
  standalone: true,
  selector: 'app-liked-page',
  template: `
    <section class="container">
      <h1>Mis Likes</h1>

      @if (loading()) {
        <p>Cargando ecos con like…</p>
      } @else {
        @for (e of likedEchos(); track e.id) {
          <ui-echo-card 
            [echo]="e"
            (onLike)="like(e.id)"
            (onUnlike)="unlike(e.id)">
          </ui-echo-card>
        } @empty {
          <p>Aún no has dado like a ningún eco.</p>
        }
      }
    </section>
  `,
  imports: [CommonModule, EchoCardComponent]
})
export class LikedPageComponent implements OnInit {
  likedEchos = signal<Ecos[]>([]);
  loading = signal(false);
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private echosService: EchosService
  ) {}

  async ngOnInit() {
    this.loading.set(true);

    // Obtener usuario actual
    const { data } = await this.authService.getUser();
    this.userId = data.user?.id ?? null;

    if (this.userId) {
      try {
        const ecos = await this.echosService.getLikedEchos(this.userId);
        this.likedEchos.set(ecos);
      } finally {
        this.loading.set(false);
      }
    } else {
      this.loading.set(false);
    }
  }

  async like(echoId: string) {
    await this.echosService.likeEcho(echoId);
    if (this.userId) {
      this.likedEchos.set(await this.echosService.getLikedEchos(this.userId));
    }
  }

  async unlike(echoId: string) {
    await this.echosService.unlikeEcho(echoId);
    if (this.userId) {
      this.likedEchos.set(await this.echosService.getLikedEchos(this.userId));
    }
  }
}
