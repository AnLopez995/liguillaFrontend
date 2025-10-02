export interface Tournament {
  id: number;
  name: string;
  description?: string;
  rounds: number;
  status: 'DRAFT' | 'ONGOING' | 'FINISHED';
}
