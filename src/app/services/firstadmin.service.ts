import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class firstAdminService {
  constructor(
    private apiService: ApiService,
  ) {}

  firstadmin(): any {
    return this.apiService.get('/firstadmin');
  }

}