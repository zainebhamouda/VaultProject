import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  fullNameTouched: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  confirmPasswordTouched: boolean = false;

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  onSignup(): void {
    // déclencher l’affichage des messages
    this.fullNameTouched = true;
    this.emailTouched = true;
    this.passwordTouched = true;
    this.confirmPasswordTouched = true;

    if (this.fullNameInvalid || this.emailInvalid || this.passwordInvalid || this.confirmPasswordInvalid) {
      return; // formulaire invalide
    }

    console.log('Signup successful!', this.fullName, this.email, this.password);
    this.router.navigate(['/dashboard']); // ou page souhaitée après inscription
  }

  get fullNameInvalid(): boolean {
    return this.fullNameTouched && !this.fullName.trim();
  }

  get emailInvalid(): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.emailTouched && (!this.email || !pattern.test(this.email));
  }

  get passwordInvalid(): boolean {
    return this.passwordTouched && (!this.password || this.password.length < 6);
  }

  get confirmPasswordInvalid(): boolean {
    return this.confirmPasswordTouched && (this.confirmPassword !== this.password);
  }
}
