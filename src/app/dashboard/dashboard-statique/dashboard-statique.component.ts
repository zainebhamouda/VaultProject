import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-statique',
  templateUrl: './dashboard-statique.component.html',
  styleUrls: ['./dashboard-statique.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardStatiqueComponent implements OnInit {
  storageUsed = 45;
  storageTotal = 100;
  totalItems = 128;
  activeUsers = 12;
  totalOrgs = 4;

  recentActivities = [
    { date: '2025-08-20', user: 'Zaineb', action: 'Added new vault' },
    { date: '2025-08-19', user: 'Ali', action: 'Deleted item' },
    { date: '2025-08-18', user: 'Sara', action: 'Updated password' },
  ];
  itemHistory = [
  { createdAt: '2025-08-21', orgName: 'Finance Org', itemTitle: 'MasterCard', userName: 'Ali', actionType: 'Created' },
  { createdAt: '2025-08-20', orgName: 'DevOps Org', itemTitle: 'SSH Key', userName: 'Sara', actionType: 'Updated' },
  { createdAt: '2025-08-19', orgName: 'Marketing Org', itemTitle: 'Gmail Login', userName: 'Zaineb', actionType: 'Deleted' }
];


  private storageChart?: Chart;
  private itemsChart?: Chart;

  ngOnInit(): void {
    Chart.register(...registerables);
    this.initCharts();
  }

  initCharts() {
    // Storage Usage Chart
    this.storageChart = new Chart("storageChart", {
      type: 'doughnut',
      data: {
        labels: ['Used', 'Free'],
        datasets: [{
          data: [this.storageUsed, this.storageTotal - this.storageUsed],
          backgroundColor: ['#0066cc', '#eee'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, padding: 10 }
          }
        }
      }
    });

    // Items Chart
    this.itemsChart = new Chart("itemsChart", {
      type: 'bar',
      data: {
        labels: ['Login', 'Card', 'Note', 'SSH Key'],
        datasets: [{
          data: [50, 20, 40, 18],
          backgroundColor: '#0066cc',
          borderRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 10 } },
          x: { ticks: { autoSkip: false } }
        }
      }
    });
  }

  // Exemple : quand on ajoute une organisation
  addOrganization() {
    this.totalOrgs++;
    this.recentActivities.unshift({
      date: new Date().toISOString().split('T')[0],
      user: 'System',
      action: 'Created new organization'
    });

    // Simuler aussi un changement de stockage
    this.storageUsed += 5;
    this.updateCharts();
  }

  // Mise à jour dynamique des graphiques
  updateCharts() {
    if (this.storageChart) {
      this.storageChart.data.datasets[0].data = [
        this.storageUsed,
        this.storageTotal - this.storageUsed
      ];
      this.storageChart.update();
    }

    if (this.itemsChart) {
      this.itemsChart.data.datasets[0].data = [
        60, 25, 45, 22 // ex: nouvelle répartition
      ];
      this.itemsChart.update();
    }
  }
}
