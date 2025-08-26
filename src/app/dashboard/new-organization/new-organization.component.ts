import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-organization',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-organization.component.html',
  styleUrls: ['./new-organization.component.css']
})
export class NewOrganizationComponent {
  constructor(private router: Router) {}
  orgName: string = '';
  billingEmail: string = '';
  plan: string = '';
  extraStorage: number = 0;
  cardNumber: string = '';
  cardExpiration: string = '';
  cardCvv: string = '';
  country: string = '';
  postalCode: string = ''; // <-- Ajouté pour corriger l'erreur

  orgNameTouched: boolean = false;
  billingEmailTouched: boolean = false;
  planTouched: boolean = false;
  extraStorageTouched: boolean = false;
  cardNumberTouched: boolean = false;
  cardExpirationTouched: boolean = false;
  cardCvvTouched: boolean = false;
  countryTouched: boolean = false;
  postalCodeTouched: boolean = false; // facultatif

  onSubmit() {
  this.orgNameTouched = true;
  this.billingEmailTouched = true;
  this.planTouched = true;
  this.extraStorageTouched = true;
  this.cardNumberTouched = true;
  this.cardExpirationTouched = true;
  this.cardCvvTouched = true;
  this.countryTouched = true;
  this.postalCodeTouched = true;

  if (!this.orgName || !this.billingEmail || !this.plan) {
    return; // formulaire invalide
  }

  // Naviguer vers Vaults avec l'orgName et collection par défaut
  this.router.navigate(['/dashboard/vaults'], {
    state: { 
      newOrg: this.orgName,
      collections: ['Default collection']   // <-- Ajout collection par défaut
    }
  });

  console.log('Organization submitted:', {
    orgName: this.orgName,
    billingEmail: this.billingEmail,
    plan: this.plan,
    extraStorage: this.extraStorage,
    cardNumber: this.cardNumber,
    cardExpiration: this.cardExpiration,
    cardCvv: this.cardCvv,
    country: this.country,
    postalCode: this.postalCode
  });

  alert('Organization successfully created!');
}

}
