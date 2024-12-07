import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private _Router: Router, private _AuthService: AuthService) {}

  userName: string = this._AuthService.getTokenInfo().userName;
  ngOnInit(): void {
    // this._AuthService.getCurrentUser().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.userName = res.userName;
    //   },
    //   error: (err) => {
    //     console.log('fea');
    //     console.log(err);
    //   },
    // });
  }
}
