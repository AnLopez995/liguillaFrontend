import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <!-- Tarjeta animada -->
      <div
        class="bg-gray-900/80 backdrop-blur-lg border border-yellow-600/40 shadow-xl rounded-2xl p-8 w-96 animate-fade-in"
      >
        <h2 class="text-3xl font-extrabold mb-6 text-center text-yellow-500 tracking-wide">
          ⚽ Liguilla
        </h2>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Correo</label>
            <input
              type="email"
              name="email"
              [(ngModel)]="email"
              class="w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              [(ngModel)]="password"
              class="w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              required
            />
          </div>

          <!-- Botón -->
          <button
            type="submit"
            class="w-full py-2 rounded-lg font-semibold text-black bg-yellow-500 hover:bg-yellow-600 transition transform hover:scale-[1.02] active:scale-[0.98]"
            [disabled]="loading()"
          >
            {{ loading() ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>

        <!-- Error -->
        <p class="text-red-500 text-center mt-4" *ngIf="error()">
          {{ error() }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `,
  ],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  onLogin() {
    this.loading.set(true);
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/standings']);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Credenciales inválidas');
      },
    });
  }
}
