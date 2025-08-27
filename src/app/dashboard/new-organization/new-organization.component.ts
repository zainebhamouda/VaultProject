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

  if (!this.orgName || !this.billingEmail || !this.plan) return;

  const confirmed = confirm('✅ Organization successfully created!\n\nClick OK to go to your Vaults.');
  if (confirmed) {
    this.router.navigate(['/dashboard/vaults'], {
      state: { 
        newOrg: this.orgName
      }
    });
  }
}

}



