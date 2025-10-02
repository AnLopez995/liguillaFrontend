import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-900 border-t border-yellow-600/30 text-gray-400 text-sm text-center py-3">
      Hecho con <span class="text-yellow-500">❤</span> para los jugadores
    </footer>
  `,
})
export class FooterComponent {}
