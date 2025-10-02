export interface MatchEvent {
  competitorId: number;
  type: 'GOAL' | 'YELLOW' | 'RED';
  minute?: number;
}
