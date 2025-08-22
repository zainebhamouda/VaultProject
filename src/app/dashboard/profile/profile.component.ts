import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  firstName: string = 'John';
  lastName: string = 'Zaineb';
  email: string = 'zaineb@example.com';

  isEditing: boolean = false;

  // Pour la photo de profil
  profileImage: string | ArrayBuffer | null = null;

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
}
