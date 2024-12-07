import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);

  if (localStorage.getItem('foodToken')) {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false;
  }
};
