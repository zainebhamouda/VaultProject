import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(private router: Router) {}

 
  goToSignUp(): void {
    this.router.navigate(['/signup']); 
  }

  onLogin(): void {
    this.emailTouched = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = this.email && emailPattern.test(this.email);
    const isPasswordValid = this.password && this.password.length >= 6;

    // Afficher l'erreur mot de passe uniquement si vide ou invalide
    if (!isPasswordValid) {
      this.passwordTouched = true;
    }

    // Si formulaire invalide, ne pas naviguer
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    console.log('Login successful!', this.email, this.password);
    this.router.navigate(['/dashboard']);
  }

  get emailInvalid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.emailTouched && (!this.email || !emailPattern.test(this.email));
  }

  get passwordInvalid(): boolean {
    return this.passwordTouched && (!this.password || this.password.length < 6);
  }
}
