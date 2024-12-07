import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private _HttpClient: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public dataa: any
  ) {}
  getprofile(): Observable<any> {
    return this._HttpClient.get('Users/currentUser');
  }
  data: any;
  // this.profile = res;

  ngOnInit(): void {
    this.getprofile().subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  url: string = 'https://upskilling-egypt.com:3006/';

  openDialog(): void {
    // this.onNoClick();
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Profile');
    });
  }
}
