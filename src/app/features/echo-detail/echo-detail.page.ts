import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EchoCardComponent } from '../../shared/echo-card/echo-card.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { EchosService } from '../../core/services/echos.service';
import { CommentsService } from '../../core/services/comments.service';
import { Ecos } from '../../core/models/ecos.model';
import { Comentarios } from '../../core/models/comentarios.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-echo-detail-page',
  template: `
    <section class="container">
      <h1>Detalle del Eco</h1>

      @if (loading()) {
        <p>Cargando eco…</p>
      } @else {
        @if (echo()) {
          <ui-echo-card
            [echo]="echo()!"
            (onLike)="likeEcho(echo()!.id)"
            (onUnlike)="unlikeEcho(echo()!.id)">
          </ui-echo-card>

          <h2>Comentarios</h2>
          <ul>
            @for (c of comments(); track c.id) {
              <li>
                <strong>@{{ c.usuario?.username }}</strong>:
                {{ c.comentario }}
              </li>
            } @empty {
              <li>Sin comentarios aún.</li>
            }
          </ul>

          <form (ngSubmit)="addComment()" #f="ngForm">
            <textarea [(ngModel)]="newComment" name="comment" placeholder="Escribe un comentario..." required></textarea>
            <ui-button type="submit" [disabled]="!newComment.trim()">Comentar</ui-button>
          </form>
        }
      }
    </section>
  `,
  imports: [CommonModule, EchoCardComponent, ButtonComponent, FormsModule]
})
export class EchoDetailPageComponent implements OnInit {
  echo = signal<Ecos | null>(null);
  comments = signal<Comentarios[]>([]);
  loading = signal(false);
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private echosService: EchosService,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEcho(id);
      this.loadComments(id);
    }
  }

  async loadEcho(id: string) {
    this.loading.set(true);
    try {
      // asumimos que getEchos puede filtrar por id o podrías crear getEchoById
      const data = await this.echosService.getEchoById(id);
      this.echo.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  async loadComments(echoId: string) {
    const data = await this.commentsService.list(echoId);
    this.comments.set(data);
  }

  async likeEcho(id: string) {
    await this.echosService.likeEcho(id);
    this.refreshEcho(id);
  }

  async unlikeEcho(id: string) {
    await this.echosService.unlikeEcho(id);
    this.refreshEcho(id);
  }

  async addComment() {
    const echoId = this.echo()?.id;
    if (!echoId || !this.newComment.trim()) return;

    // UI Optimista
    const optimisticComment: Comentarios = {
      id: 'temp-' + Date.now(),
      ecos_id: echoId,
      usuario_id: 'me', // luego reemplazar con userId real
      comentario: this.newComment,
      created_at: new Date().toISOString(),
      usuario: { id: 'me', username: 'Yo', avatar_url: '', created_at: new Date().toISOString() }
    };

    this.comments.update(cs => [...cs, optimisticComment]);

    try {
      await this.commentsService.add(echoId, 'me', this.newComment);
      this.newComment = '';
      this.loadComments(echoId);
    } catch (err) {
      console.error(err);
    }
  }

  refreshEcho(id: string) {
    this.loadEcho(id);
  }
}
