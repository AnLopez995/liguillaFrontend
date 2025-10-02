import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header class="bg-gray-900 border-b border-yellow-600/30 shadow-md px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <h1 class="text-yellow-500 text-2xl font-extrabold tracking-wide">
        ⚽ Liguilla
      </h1>

      <!-- Botones -->
      <nav class="flex gap-6 items-center">
        <button class="text-gray-300 hover:text-yellow-500 transition">Perfil</button>
        <button class="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
          Salir
        </button>
      </nav>
    </header>
  `,
})
export class NavbarComponent { }
