import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Vault {
  name: string;
  type: string;
  folder: string;
  owner: string;
  organization?: string;
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
  // ---- État global ----
  searchText = '';
  selectedVault = 'all';
  selectedType = 'all';
  selectedFolder = 'none';
  selectedCollection = 'Default collection';

  showTypeSelector = false;   // popup choix type
  showAddForm = false;        // formulaire affiché
  currentVaultType: string | null = null;
  userEmail: string = 'zaineb.hamouda09@gmail.com';  // ton email principal
  organizationMembers: { email: string }[] = [
    { email: 'member1@org.com' },
    { email: 'member2@org.com' }
    // ajouter tous les membres des organisations
  ];
  // ---- Liste des types disponibles ----
  vaultTypes = [
    { key: 'login', label: 'Identifiant' },
    { key: 'card', label: 'Carte de paiement' },
    { key: 'identity', label: 'Identité' },
    { key: 'note', label: 'Note' },
    { key: 'ssh', label: 'Clé SSH' },
    { key: 'folder', label: 'Dossier' },
    { key: 'collection', label: 'Collection' }
  ];

  // ---- Champs du formulaire ----
  newVaultName = '';
  newVaultOwner = 'zaineb.hamouda09@gmail.com';
  newVaultFolder = 'Aucun dossier';
  newVaultUsername = '';
  newVaultPassword = '';
  newVaultCardNumber = '';
  newVaultCardExpiry = '';
  newVaultCardCVV = '';
  newVaultNote = '';
  newVaultIdentity = '';
  newVaultSSHKey = '';

  // ---- Données ----
  vaults: Vault[] = [];
  allSelected = false;
  organizations: string[] = ['All Vaults', 'My Vault'];
  folders: string[] = ['No Folder'];
  orgCollectionsMap: { [key: string]: string[] } = {};

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { newOrg?: string };
    if (state?.newOrg) {
      this.addNewOrganization(state.newOrg);
    }
  }

  // ---- Gestion organisations ----
  addNewOrganization(name: string) {
    if (!this.organizations.includes(name)) {
      this.organizations.push(name);
      this.orgCollectionsMap[name] = ['Default collection'];
    }
    this.selectedVault = name;
    this.selectedCollection = this.orgCollectionsMap[name][0];
  }

  goToNewOrganization() {
    this.selectedVault = 'newOrg';
    this.router.navigate(['/dashboard/new-organization']);
  }

  // ---- Gestion vaults ----
  addVault(
    name: string,
    type: string,
    folder: string,
    owner: string,
    organization: string
  ) {
    const newVault: Vault = { name, type, folder, owner, organization, selected: false };
    this.vaults.push(newVault);

    if (!this.organizations.includes(organization)) {
      this.organizations.push(organization);
      this.orgCollectionsMap[organization] = ['Default collection'];
    }

    this.resetForm();
  }

  // ---- Sélection type et formulaire ----
  openTypeSelector() {
    this.showTypeSelector = true;
    this.showAddForm = false;
  }

  selectVaultType(type: string) {
    this.currentVaultType = type;
    this.showTypeSelector = false;
    this.showAddForm = true;
  }

  closeForm() {
    this.showAddForm = false;
    this.currentVaultType = null;
    this.resetForm();
  }

  // ---- Table Vaults ----
  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.filteredVaults().forEach(v => (v.selected = checked));
    this.allSelected = checked;
  }

  checkIfAllSelected() {
    this.allSelected = this.filteredVaults().every(v => v.selected);
  }

  selectVault(v: string) {
    this.selectedVault = v;
    this.selectedCollection = this.orgCollectionsMap[v]?.[0] || 'Default collection';
  }

  selectType(t: string) { this.selectedType = t; }
  selectFolder(f: string) { this.selectedFolder = f; }
  selectCollection(c: string) { this.selectedCollection = c; }

  filteredVaults(): Vault[] {
    if (this.selectedVault === 'all') return this.vaults;
    if (this.selectedVault === 'my') return this.vaults.filter(v => v.organization === 'My Vault');
    return this.vaults.filter(v => v.organization === this.selectedVault);
  }

  showAddNewItemButton(): boolean {
    return !!this.orgCollectionsMap[this.selectedVault];
  }

  showCollections(): boolean {
    return !!this.orgCollectionsMap[this.selectedVault];
  }

  // ---- Utils ----
  public resetForm() {
    this.newVaultName = '';
    this.newVaultFolder = 'Aucun dossier';
    this.newVaultOwner = '';
    this.newVaultUsername = '';
    this.newVaultPassword = '';
    this.newVaultCardNumber = '';
    this.newVaultCardExpiry = '';
    this.newVaultCardCVV = '';
    this.newVaultNote = '';
    this.newVaultIdentity = '';
    this.newVaultSSHKey = '';
  }
 

// ouvrir le formulaire pour + New Item
openAddForm() {
  this.currentVaultType = null;  // formulaire général
  this.showAddForm = true;
}

saveVaultByType() {
  if (!this.currentVaultType) return;

  switch (this.currentVaultType) {
    case 'login':
      this.addVault(
        this.newVaultName,
        'login',
        this.newVaultFolder,
        this.newVaultOwner,
        'My Vault'
      );
      break;
    case 'card':
      this.addVault(
        this.newVaultName,
        'card',
        this.newVaultFolder,
        this.newVaultOwner,
        'My Vault'
      );
      break;
    case 'note':
      this.addVault(
        this.newVaultName,
        'note',
        this.newVaultFolder,
        this.newVaultOwner,
        'My Vault'
      );
      break;
    // Ajouter les autres types si besoin : identity, ssh, folder, collection
  }

  // Réinitialiser le formulaire
  this.resetForm();
  this.showAddForm = false;
}



}
