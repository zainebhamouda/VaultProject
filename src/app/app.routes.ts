import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { VaultsComponent } from './dashboard/vaults/vaults.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
   { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'vaults', component: VaultsComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
]}


];
