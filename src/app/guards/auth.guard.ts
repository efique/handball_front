import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  // const cookieValue = cookieService.get('access_token');
  // console.log(cookieService.get('access_token'));
  return true;
  // if (route.routeConfig?.path === 'login') {
  //   return authService.isAuthenticated().pipe(
  //     map(() => {
  //       router.navigate(['/home']);
  //       return false;
  //     }),
  //     catchError(() => {
  //       return of(true);
  //     })
  //   );
  // }

  // return authService.isAuthenticated().pipe(
  //   map(() => {
  //     return true;
  //   }),
  //   catchError(() => {
  //     router.navigate(['/home']);
  //     return of(false);
  //   })
  // );
};
