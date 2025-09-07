import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  firstName: string = 'John';
  lastName: string = 'Zaineb';
  email: string = 'zaineb@example.com';

  isEditing: boolean = false;
  avatarColor: string = '#ADD8E6';        // couleur réelle de l'avatar
  tempAvatarColor: string = this.avatarColor; // couleur temporaire dans la modale
  profileImage: string | ArrayBuffer | null = null;
  isModalOpen: boolean = false;

  avatarColors: string[] = [
    "#ADD8E6", "#32CD32", "#FFA500", "#E6A8D7",
    "#FFFF00", "#4B0082", "#00CED1", "#FA8072", "#FF69B4"
  ];

  toggleEdit() {
    this.isEditing = true;
  }

  saveChanges() {
    this.isEditing = false;
    console.log('Modifications sauvegardées :', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      profileImage: this.profileImage
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  getInitials(): string {
    const firstInitial = this.firstName.charAt(0).toUpperCase();
    const lastInitial = this.lastName.charAt(0).toUpperCase();
    return `${lastInitial}${firstInitial}`;
  }

  // Ouvrir la modale
  openModal() {
    this.tempAvatarColor = this.avatarColor; // initialiser la couleur temporaire
    this.isModalOpen = true;
  }

  // Fermer la modale
  closeModal() {
    this.tempAvatarColor = this.avatarColor; // réinitialiser la couleur temporaire
    this.isModalOpen = false;
  }

  // Sauvegarder la couleur sélectionnée
  saveColor() {
    this.avatarColor = this.tempAvatarColor; // appliquer la couleur
    this.closeModal();
  }

  deleteAccount() {
    if (confirm("⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      console.log("Compte supprimé");
    }
  }

  clearVault() {
    if (confirm("Voulez-vous vraiment effacer le coffre ?")) {
      console.log("Coffre effacé");
    }
  }

  revokeSessions() {
    if (confirm("Voulez-vous révoquer toutes les sessions actives ?")) {
      console.log("Sessions révoquées");
    }
  }

  disableDeviceProtection() {
    if (confirm("Voulez-vous désactiver la protection de connexion de ce nouvel appareil ?")) {
      console.log("Protection désactivée");
    }
  }

  chooseCustomColor() {
    // l'input color gère le choix
  }

  setCustomColor(color: string) {
    this.tempAvatarColor = color; // changer la couleur temporaire
  }
}
