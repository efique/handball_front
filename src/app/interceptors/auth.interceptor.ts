import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavBarService } from '../services/navbar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private route: Router,
    private navbarService: NavBarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/auth/refresh') > -1) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status == 401) {
          return this.handle401Error(req, next, error);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: any
  ) {
    return this.authService.refreshCookies().pipe(
      switchMap(() => {
        return next.handle(req);
      }),
      catchError(() => {
        if (this.route.url !== '/login') {
          this.navbarService.isLoggedIn.next(false);
          this.route.navigate(['/']);
        }
        return throwError(() => originalError);
      })
    );
  }
}
