import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Tournament } from '../../shared/models/tournament.model';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tournaments.component.html',
})
export class TournamentsComponent implements OnInit {
  private api = inject(ApiService);
  tournaments = signal<Tournament[]>([]);

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments() {
    this.api.get<Tournament[]>('/tournaments').subscribe({
      next: (data) => this.tournaments.set(data),
      error: (err) => console.error('Error cargando torneos', err),
    });
  }
}
