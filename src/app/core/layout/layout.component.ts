import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.componet';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="flex h-screen bg-gray-950 text-gray-100">
      <!-- Sidebar -->
      <app-sidebar class="hidden md:block"></app-sidebar>

      <!-- Main content -->
      <div class="flex flex-col flex-1">
        <!-- Navbar -->
        <app-navbar></app-navbar>

        <!-- Page content -->
        <main class="flex-1 overflow-y-auto p-6 animate-fade-in">
          <router-outlet></router-outlet>
        </main>

        <!-- Footer -->
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.6s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
})
export class LayoutComponent { }
