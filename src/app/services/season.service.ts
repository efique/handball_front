import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  constructor(private apiService: ApiService) {}

  submitSeason(name: string, victory: number, draw: number, lose: number) {
    return this.apiService.post('/seasons', {
      name: name,
      victory: victory,
      draw: draw,
      lose: lose,
    });
  }
}
