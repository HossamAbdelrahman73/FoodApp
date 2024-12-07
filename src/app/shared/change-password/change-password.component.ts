import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _HttpClient: HttpClient,
    private _ToastrService: ToastrService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sign: boolean = false;

  changePassword() {
    this.onchangePassword(this.data).subscribe({
      next: (res: any) => {
        console.log(res);
        this._ToastrService.success(res.message, 'success');
        this.onNoClick();
      },
      error: (err: any) => {
        console.log(err);
        if (err.error.additionalInfo?.errors) {
          let mapErrors = new Map(
            Object.entries(err.error.additionalInfo?.errors)
          );

          console.log(mapErrors);

          for (const [msg, val] of mapErrors) {
            this._ToastrService.error(`${val}`, `${msg} Error`);
          }
        } else {
          this._ToastrService.error(err.error.message, 'Error');
        }
      },
    });
  }

  onchangePassword(data: object): Observable<any> {
    return this._HttpClient.put(`Users/ChangePassword`, data);
  }
}
