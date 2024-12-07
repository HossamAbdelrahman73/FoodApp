import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verfiy-email.component.html',
  styleUrls: ['./verfiy-email.component.scss'],
})
export class VerfiyEmailComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  verifyForm: FormGroup = this._FormBuilder.group({
    // email: [`${localStorage.getItem('emailVerify')}`],
    email: [`${this._AuthService.emailVerficationValue}`],
    code: ['', [Validators.required]],
  });
  verfiy: boolean = true;
  spinVerfiy: boolean = false;
  isReadonly: boolean = true;

  myVerification() {
    this.spinVerfiy = true;
    this._AuthService.onVerifyAcount(this.verifyForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'success');
        this.spinVerfiy = false;
        this.verfiy = true;
        setTimeout(() => {
          this._Router.navigate(['/auth/login']);
          this._AuthService.emailVerficationValue = '';
          // localStorage.setItem('emailVerify', '');
        }, 1000);
      },
      error: (err) => {
        console.log(err);
        this.spinVerfiy = false;
        this._ToastrService.error(err.message, 'Error');
      },
    });
  }
}
