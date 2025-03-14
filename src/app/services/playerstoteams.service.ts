import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';
import { ApiService } from './api.service';
import { Season } from '../interfaces/season';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersToTeamsService {

  constructor(private apiService: ApiService) { }

  getAllTeams(): Observable<Team[]> {
    return this.apiService.get('/teams');
  }

  getAllPlayers(): Observable<Player[]> {
    return this.apiService.get('/players');
  }

  getAllSeasons(): Observable<Season[]> {
    return this.apiService.get('/seasons');
  }

  submitPlayersToTeams(team_id: number, player_id: number, season_id: number) {
    return this.apiService.post('/playerstoteams', {
      team_id: team_id, player_id: player_id, season_id: season_id
    });
  }
}
