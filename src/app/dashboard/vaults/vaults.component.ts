import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Vault {
  name: string;
  type: string;
  folder: string;
  owner: string;
  selected?: boolean;
}

@Component({
  selector: 'app-vaults',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vaults.component.html',
  styleUrls: ['./vaults.component.css']
})
export class VaultsComponent {
  searchText: string = '';
  selectedVault: string = 'all';
  selectedType: string = 'all';
  selectedFolder: string = 'none';

organizations: string[] = ['All Vaults', 'My Vault', 'New Organization'];
collections: string[] = [];
selectedOrganization: string = 'All Vaults';

constructor(private router: Router) {
  const navigation = this.router.getCurrentNavigation();
  const state = navigation?.extras?.state as { newOrg?: string };

  if (state?.newOrg) {
    this.addNewOrganization(state.newOrg);
  }
}

addNewOrganization(name: string) {
  // insérer après "My Vault" et avant "New Organization"
  this.organizations.splice(2, 0, name);
  this.selectedOrganization = name;

  // ajouter les collections
  this.collections = ['Collection par défaut', 'Corbeille'];
}

goToNewOrganization() {
  this.selectedVault = 'newOrg';
  this.router.navigate(['/dashboard/new-organization']);
}
  vaults: Vault[] = [
  { name: 'Google', type: 'identifiant', folder: 'none', owner: 'Moi', selected: false },
  { name: 'Visa', type: 'carte', folder: 'none', owner: 'Moi', selected: false },
  { name: 'Github SSH', type: 'ssh', folder: 'none', owner: 'Moi', selected: false },
  { name: 'Bitwarden', type: 'identifiant', folder: 'trash', owner: 'Admin', selected: false },
  { name: 'Note secrète', type: 'note', folder: 'none', owner: 'Zaineb', selected: false },
];
allSelected: boolean = false;

toggleAll(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  this.filteredVaults().forEach(v => v.selected = checked);
  this.allSelected = checked;
}

checkIfAllSelected() {
  this.allSelected = this.filteredVaults().every(v => v.selected);
}
  selectVault(v: string) { this.selectedVault = v; }
  selectType(t: string) { this.selectedType = t; }
  selectFolder(f: string) { this.selectedFolder = f; }
  
  
  filteredVaults() {
  return this.vaults.filter(v =>
    v.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
    (this.selectedVault === 'all' || 
     (this.selectedVault === 'my' && v.folder === 'none') || 
     (this.selectedVault === 'newOrg' && v.folder === 'newOrg')) &&
    (this.selectedType === 'all' || this.selectedType === v.type) &&
    (this.selectedFolder === 'all' || this.selectedFolder === v.folder)
  );
}
  
}
