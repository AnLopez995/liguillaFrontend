import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { StandingsComponent } from './features/standings/standings.component';
import { MatchesComponent } from './features/matches/matches.component';
import { TournamentsComponent } from './features/tournaments/tournaments.component';
import { TournamentFormComponent } from './features/tournaments/tournament-form.component';
import { TournamentDetailComponent } from './features/tournaments/tournament-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'standings', component: StandingsComponent },
      { path: 'matches', component: MatchesComponent },
      {
        path: 'tournaments',
        children: [
          { path: '', component: TournamentsComponent },
          { path: 'new', component: TournamentFormComponent },
          { path: ':id', component: TournamentDetailComponent }
        ]
      },
      { path: '', redirectTo: 'standings', pathMatch: 'full' }

    ]
  },
  { path: '**', redirectTo: 'login' },
];
