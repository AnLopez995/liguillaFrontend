export interface User {
  id: number;
  display_name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}
