import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import moment from 'moment';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    return this.apiService
      .post('/auth/login', { username, password })
      .subscribe({
        next: (data) => {
          this.toastr.success(
            'Succes!',
            'Connexion réussie, bienvenue ' + username
          );
          localStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error(
            'Erreur!',
            'Une erreur est survenue lors de la connexion'
          ),
            console.error(err);
        },
      });
  }

  logout() {
    return this.apiService.get('/auth/logout').subscribe({
      next: (data) => {
        this.toastr.success('Succes!', 'Vous avez été déconnecté'),
          localStorage.removeItem('user');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error(
          'Erreur!',
          'Une erreur est survenue lors de la déconnexion'
        ),
          console.error(err);
      },
    });
  }
}
