export interface Match {
  id: number;
  match_day: number;

  // nombres de equipos (el backend te devuelve local_name y away_name)
  local_name: string;
  away_name: string;

  // estado del partido
  status: 'PENDING' | 'PLAYED';

  // goles registrados
  localGoals?: number;
  awayGoals?: number;

  // ids de los competidores en DB (tournament_competitors)
  localCompetitorId?: number;
  awayCompetitorId?: number;
}
