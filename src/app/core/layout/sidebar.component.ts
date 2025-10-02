import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="h-full bg-gray-900 border-r border-yellow-600/30 w-64 p-4 flex flex-col">
      <!-- Navegación -->
      <nav class="flex-1 space-y-2">
        <a routerLink="/standings" class="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-yellow-500 transition">
          🏆 Tabla de posiciones
        </a>
        <a routerLink="/matches" class="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-yellow-500 transition">
          📅 Partidos
        </a>
        <a routerLink="/tournaments" class="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-yellow-500 transition">
          🎯 Torneos
        </a>
      </nav>

      <!-- Footer mini -->
      <footer class="text-xs text-gray-500 mt-6">
        © 2025 Liguilla
      </footer>
    </aside>
  `,
})
export class SidebarComponent {}
