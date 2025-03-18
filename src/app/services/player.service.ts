import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Player } from '../interfaces/player';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private apiService: ApiService) { }
  isPlayerPage = new BehaviorSubject<boolean>(false);
  currentPlayerPage = this.isPlayerPage.asObservable();

  getAllPlayers(limit: number, offset: number) {
    return this.apiService.get('/players?limit=' + limit + '&offset=' + offset);
  }

  submitPlayer(firstName: string, lastName: string, role: string) {
    return this.apiService.post('/players', {
      firstname: firstName,
      lastname: lastName,
      role: role,
    });
  }
}
