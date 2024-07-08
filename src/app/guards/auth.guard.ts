import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().subscribe({
    next: (data: any) => {
      if (data != null) {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    },
    error: (err: any) => {
      if (route.routeConfig?.path === 'login') {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    },
  });
};
