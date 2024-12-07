import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent {
  constructor(private _Router: Router, private _AuthService: AuthService) {}

  userName = computed(() => this._AuthService.name());
}
