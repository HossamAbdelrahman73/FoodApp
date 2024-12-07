import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateProfile: FormGroup = this._FormBuilder.group({
    userName: [`${this.data.userName}`, [Validators.required]],
    email: [`${this.data.email}`, [Validators.required]],
    country: [`${this.data.country}`, [Validators.required]],
    phoneNumber: [`${this.data.phoneNumber}`, [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  url: string = 'https://upskilling-egypt.com:3006/';
  files: File[] = [];
  imgSrc: any;

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imgSrc = event.addedFiles[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  sendData() {
    let myData = new FormData();
    let entries = Object.entries(this.updateProfile.value);

    entries.forEach((entry) => {
      myData.append(`${entry[0]}`, `${entry[1]}`);
    });

    myData.append('profileImage', this.imgSrc);

    this.onupdateProfile(myData).subscribe({
      next: (res) => {
        console.log(res);
        // this.data = res;
        this._AuthService.name.set(res.userName);
        this._ToastrService.success('Updated Successfully');
        this._Router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.additionalInfo?.errors) {
          let mapErrors = new Map(
            Object.entries(err.error.additionalInfo?.errors)
          );

          for (const [msg, val] of mapErrors) {
            this._ToastrService.error(`${val}`, `${msg} Error`);
          }
        } else {
          this._ToastrService.error(err.error.message, 'Error');
        }
      },
    });
  }

  onupdateProfile(data: FormData): Observable<any> {
    return this._HttpClient.put(`Users/`, data);
  }
}
