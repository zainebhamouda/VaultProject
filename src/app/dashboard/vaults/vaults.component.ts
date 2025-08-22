import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Vault {
  name: string;
  type: string;
  folder: string;
}

@Component({
  selector: 'app-vaults',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vaults.component.html',
  styleUrls: ['./vaults.component.css']
})
export class VaultsComponent {
  selectedVault: string = 'all';
  selectedType: string = 'all';
  selectedFolder: string = 'none';

  vaults: Vault[] = [
    { name: 'Google', type: 'identifiant', folder: 'none' },
    { name: 'Visa', type: 'carte', folder: 'none' },
    { name: 'Github SSH', type: 'ssh', folder: 'none' },
    { name: 'Bitwarden', type: 'identifiant', folder: 'trash' },
    { name: 'Note secrète', type: 'note', folder: 'none' },
  ];

  selectVault(v: string) { this.selectedVault = v; }
  selectType(t: string) { this.selectedType = t; }
  selectFolder(f: string) { this.selectedFolder = f; }

  filteredVaults() {
    return this.vaults.filter(v =>
      (this.selectedVault==='all' || (this.selectedVault==='my' && v.folder==='none') || (this.selectedVault==='newOrg' && v.folder==='newOrg')) &&
      (this.selectedType==='all' || this.selectedType===v.type) &&
      (this.selectedFolder==='none' || this.selectedFolder===v.folder)
    );
  }
}
