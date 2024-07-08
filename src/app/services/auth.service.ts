import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { NavBarService } from './navbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private navbarService: NavBarService
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
          this.navbarService.isLoggedIn.next(true);
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
          this.navbarService.isLoggedIn.next(false);
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

  isAuthenticated(): any {
    return this.apiService.get('/auth/profile');
  }

  refreshCookies() {
    return this.apiService.get('/auth/refresh');
  }
}
