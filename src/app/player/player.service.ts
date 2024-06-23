import { Injectable, inject } from '@angular/core';
import { Player } from '../interfaces/player';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  readonly url = 'http://localhost:3000/players';
  private players: Player[] = [];

  constructor(private toastr: ToastrService) {}

  private headers = new HttpHeaders({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MSwiaWF0IjoxNzE5MTYwNzQ2LCJleHAiOjE3MTkxNzUxNDZ9.foFU3SVjd0D9dCzwjKETY019kkY87TkXI0JtiajxAEA',
  });
  // getAllPlayers(): Observable<Player[]> {
  //   return this.http.get<Player[]>(this.url, { headers: this.headers });
  // }

  showSuccess() {
    this.toastr.success('Succes!', 'Le joueur a bien été crée');
  }
  showError() {
    this.toastr.error(
      'Erreur!',
      'Une erreur est survenue lors de la création du joueur'
    );
  }

  submitPlayer(firstName: string, lastName: string, role: string) {
    this.http
      .post<Player>(
        this.url,
        { firstname: firstName, lastname: lastName, role: role },
        {
          headers: this.headers,
        }
      )
      .subscribe({
        next: (data) => {
          this.showSuccess();
        },
        error: (err) => {
          this.showError(), console.error(err);
        },
      });
  }
}
