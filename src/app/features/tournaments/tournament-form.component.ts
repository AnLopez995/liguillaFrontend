import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api/api.service';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tournament-form.component.html',
})
export class TournamentFormComponent {
  private api = inject(ApiService);
  private router = inject(Router);

  name: string = '';
  description: string = '';
  rounds: number = 1;
  loading = signal(false);
  error = signal<string | null>(null);

  createTournament() {
    this.loading.set(true);
    this.error.set(null);

    this.api
      .post('/tournaments', {
        name: this.name,
        description: this.description,
        rounds: this.rounds,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          alert('✅ Torneo creado con éxito');
          this.router.navigate(['/tournaments']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set('Error al crear torneo');
          console.error(err);
        },
      });
  }
}
