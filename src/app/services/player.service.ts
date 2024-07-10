import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // private players: Player[] = [];

  constructor(private apiService: ApiService) {}

  // getAllPlayers(): Observable<Player[]> {
  //   return this.http.get<Player[]>(this.url, { headers: this.headers });
  // }

  submitPlayer(firstName: string, lastName: string, role: string) {
    return this.apiService.post('/players', {
      firstname: firstName,
      lastname: lastName,
      role: role,
    });
  }
}
