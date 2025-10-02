import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:8080/auth';

  // Signals para estado reactivo
  isAuthenticated = signal<boolean>(false);
  token = signal<string | null>(null);

  constructor() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token.set(savedToken);
      this.isAuthenticated.set(true);
    }
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.token.set(res.token);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token();
  }
}
