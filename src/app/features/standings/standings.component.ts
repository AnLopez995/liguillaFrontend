import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Standing } from '../../shared/models/standing.model';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./standings.component.html",
  styleUrl: "./standings.component.css"
})
export class StandingsComponent implements OnInit {
  private api = inject(ApiService);
  standings = signal<Standing[]>([]);

  ngOnInit(): void {
    this.api.get<Standing[]>('/standings/1').subscribe({
      next: (data) => this.standings.set(data),
      error: (err) => console.error('Error cargando standings', err),
    });
  }
}
