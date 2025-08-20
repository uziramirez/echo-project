import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfilesService } from '../../core/services/profiles.services';
import { AuthService } from '../../core/auth/auth.service';
import { Usuario } from '../../core/models/usuario.model';
import { ButtonComponet } from '../../shared/button/button.componet';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  template: `
    <section class="container">
      <h1>Perfil de @{{ profile()?.username }}</h1>

      @if (loading()) {
        <p>Cargando perfil…</p>
      } @else {
        @if (profile()) {
          <div class="profile-card">
            <img [src]="profile()?.avatar_url || defaultAvatar" class="avatar" alt="avatar" />

            @if (isOwner()) {
              <!-- Inputs de edición -->
              <div>
                <label>Username</label>
                <input [(ngModel)]="editableProfile.username" />
              </div>

              <div>
                <label>Bio</label>
                <textarea [(ngModel)]="editableProfile.bio"></textarea>
              </div>
                <button ui-button (click)="save()">Guardar</button>
                <button ui-button variant="secondary" type="submit">Cancelar</button>
            } @else {
              <!-- Solo lectura -->
              <p><strong>Usuario:</strong> {{ profile()?.username }}</p>
            }
          </div>
        } @else {
          <p>Perfil no encontrado.</p>
        }
      }
    </section>
  `,
  imports: [CommonModule, FormsModule]
})
export class ProfilePageComponent implements OnInit {
  profile = signal<Usuario | null>(null);
  editableProfile: Partial<Usuario> & { bio?: string } = {};
  loading = signal(false);
  currentUserId: string | null = null;
  defaultAvatar = 'https://placehold.co/100x100';

  constructor(
    private route: ActivatedRoute,
    private profilesService: ProfilesService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.loading.set(true);

    // obtenemos el username desde la ruta
    const username = this.route.snapshot.paramMap.get('username');

    // obtenemos el usuario actual autenticado
    const { data } = await this.authService.getUser();
    this.currentUserId = data.user?.id ?? null;

    if (username) {
      try {
        const profile = await this.profilesService.getProfileByUsername(username);
        this.profile.set(profile);
        this.editableProfile = { ...profile };
      } finally {
        this.loading.set(false);
      }
    }
  }

  isOwner(): boolean {
    return this.profile()?.id === this.currentUserId;
  }

  async save() {
    if (!this.isOwner() || !this.profile()) return;
    await this.profilesService.updateProfile(this.profile()!.id, this.editableProfile);
    // refrescamos
    const refreshed = await this.profilesService.getProfile(this.profile()!.id);
    this.profile.set(refreshed);
  }
}
