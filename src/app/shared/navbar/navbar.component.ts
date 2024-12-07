import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // dialog: any;

  constructor(
    public dialog: MatDialog,
    private _Router: Router,
    private _AuthService: AuthService,
    private _HttpClient: HttpClient
  ) {}

  userName = computed(() => this._AuthService.name());

  getprofile(): Observable<any> {
    return this._HttpClient.get('Users/currentUser');
  }

  ngOnInit(): void {
    this.getprofile().subscribe((res) => {
      console.log(res);
      this._AuthService.name.set(res.userName);
    });
    // this._AuthService.name
    // console.log();
  }

  logOut() {
    localStorage.removeItem('foodToken');
    this._Router.navigate(['/auth']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Add category');
    });
  }

  openProfile(): void {
    const dialogRef = this.dialog.open(ProfileComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Nav');
    });
  }
}
