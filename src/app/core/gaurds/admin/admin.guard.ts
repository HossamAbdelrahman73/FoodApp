import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let _AuthService = inject(AuthService);
  let _Router = inject(Router);

  if (_AuthService.getTokenInfo().role == 'SuperAdmin') {
    return true;
  } else {
    _Router.navigate(['/dashboard/user']);
    return false;
  }
};
