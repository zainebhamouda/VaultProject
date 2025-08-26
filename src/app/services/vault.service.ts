import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vault {
  id?: number;
  name: string;
  type: string;
  folder: string;
  owner: string;
}

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private apiUrl = 'http://localhost:5000/api/vaults'; // ⚡ Mets ton URL backend ici

  constructor(private http: HttpClient) {}

  // Récupérer tous les vaults
  getVaults(): Observable<Vault[]> {
    return this.http.get<Vault[]>(this.apiUrl);
  }

  // Ajouter un nouveau vault
  addVault(vault: Vault): Observable<Vault> {
    return this.http.post<Vault>(this.apiUrl, vault);
  }

  // Supprimer un vault
  deleteVault(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
