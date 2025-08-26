import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarCollapsed = false;
  pageTitle: string = 'My Profile';
  profileImage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Écoute les changements de route pour mettre à jour le titre
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('profile')) {
          this.pageTitle = 'My Profile';
        } else if (url.includes('vaults')) {
          this.pageTitle = 'My Vaults';
        } else if (url.includes('new-organization')) {
          this.pageTitle = 'New Organization';
        } else if (url.includes('statique')) {
          this.pageTitle = 'Dashboard';
        } else {
          this.pageTitle = 'My Profile';
        }
      }
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  goToProfile() {
    this.router.navigate(['/dashboard/profile']);
  }

  goToVaults() {
    this.router.navigate(['/dashboard/vaults']);
  }

  goToOrganisation() {
    this.router.navigate(['/dashboard/organisation']);
  }
}
