import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (_AuthService.getTokenInfo().role == 'SuperAdmin') {
      _Router.navigate(['/dashboard/admin']);
    } else {
      _Router.navigate(['/dashboard/user']);
    }
  }
  // auth = this._AuthService;

  ngOnInit(): void {}
}
