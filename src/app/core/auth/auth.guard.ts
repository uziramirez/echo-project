import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  const isAuth = await auth.isAuthenticated();

  return isAuth ? true : router.createUrlTree(['/login']);
};