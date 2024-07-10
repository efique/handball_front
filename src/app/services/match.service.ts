import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private apiService: ApiService) {}

  getAllTeams(): Observable<Team[]> {
    return this.apiService.get('/teams');
  }

  submitMatch(team_id: number, versus: string, date: Date, isHome: boolean) {
    return this.apiService.post('/matchs', {
      team_id: team_id,
      versus: versus,
      date: date,
      isHome: isHome,
      status: 'notstarted',
    });
  }
}
