import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Tournament } from '../../shared/models/tournament.model';

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-detail.component.html',
})
export class TournamentDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  tournament = signal<Tournament | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.get<Tournament>(`/tournaments/${id}`).subscribe({
      next: (data) => this.tournament.set(data),
      error: (err) => console.error('Error cargando torneo', err),
    });
  }

  startTournament() {
    if (!this.tournament()) return;
    this.api.post(`/tournaments/${this.tournament()!.id}/start`, {}).subscribe({
      next: () => {
        alert('✅ Torneo iniciado!');
        this.ngOnInit(); // refrescar estado
      },
      error: (err) => console.error('Error iniciando torneo', err),
    });
  }
}
