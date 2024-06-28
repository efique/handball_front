import { Injectable, inject } from '@angular/core';
import { Player } from '../interfaces/player';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // private players: Player[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  // getAllPlayers(): Observable<Player[]> {
  //   return this.http.get<Player[]>(this.url, { headers: this.headers });
  // }

  submitPlayer(firstName: string, lastName: string, role: string) {
    this.apiService
      .post('/players', {
        firstname: firstName,
        lastname: lastName,
        role: role,
      })
      .subscribe({
        next: (data) => {
          this.toastr.success('Succes!', 'Le joueur a bien été crée');
        },
        error: (err) => {
          this.toastr.error(
            'Erreur!',
            'Une erreur est survenue lors de la création du joueur'
          ),
            console.error(err);
        },
      });
  }
}
