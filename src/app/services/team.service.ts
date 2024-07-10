import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private apiService: ApiService) {}

  submitTeam(name: string) {
    return this.apiService.post('/teams', {
      name: name,
    });
  }
}
