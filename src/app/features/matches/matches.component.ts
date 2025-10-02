import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';
import { Match } from '../../shared/models/match.model';
import { MatchEvent } from '../../shared/models/match-event.model';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  private api = inject(ApiService);
  matches = signal<Match[]>([]);
  selectedMatch = signal<Match | null>(null);

  localGoals: number = 0;
  awayGoals: number = 0;
  events: MatchEvent[] = [];

  ngOnInit(): void {
    this.api.get<Match[]>('/matches/1').subscribe({
      next: (data) => this.matches.set(data),
      error: (err) => console.error('Error cargando partidos', err),
    });
  }

  groupedMatches() {
    const grouped: { match_day: number; matches: Match[] }[] = [];
    this.matches().forEach((m) => {
      let group = grouped.find((g) => g.match_day === m.match_day);
      if (!group) {
        group = { match_day: m.match_day, matches: [] };
        grouped.push(group);
      }
      group.matches.push(m);
    });
    return grouped.sort((a, b) => a.match_day - b.match_day);
  }

  openModal(match: Match) {
    this.selectedMatch.set(match);
    this.localGoals = 0;
    this.awayGoals = 0;
    this.events = [];
  }

  closeModal() {
    this.selectedMatch.set(null);
  }

  selectCompetitorId(name: string): number {
    const match = this.selectedMatch();
    if (!match) return 0;
    return name === match.local_name
      ? match.localCompetitorId!
      : match.awayCompetitorId!;
  }

  addEvent(competitorId: number, type: string, minute: number) {
    // aquí fuerzas el tipo correcto en TS, no en el template
    this.events.push({ competitorId, type: type as 'GOAL' | 'YELLOW' | 'RED', minute });
  }


  removeEvent(index: number) {
    this.events.splice(index, 1);
  }

  reportMatch() {
    if (!this.selectedMatch()) return;

    this.api
      .put(`/matches/${this.selectedMatch()!.id}/report`, {
        localGoals: this.localGoals,
        awayGoals: this.awayGoals,
        events: this.events,
      })
      .subscribe({
        next: () => {
          this.closeModal();
          this.ngOnInit(); // refresca partidos
        },
        error: (err) => console.error('Error reportando partido', err),
      });
  }
}
