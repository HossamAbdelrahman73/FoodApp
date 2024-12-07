import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  let _AuthService = inject(AuthService);
  let _Router = inject(Router);

  if (_AuthService.getTokenInfo().role == 'SystemUser') {
    console.log('asd', _AuthService.getTokenInfo());

    return true;
  } else {
    _Router.navigate(['/dashboard/admin']);
    console.log(_AuthService.getTokenInfo().role);
    return false;
  }
};
