import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  forgetsign: boolean = true;
  spin: boolean = false;

  forgetEmailForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  sendEmailForget() {
    this.spin = true;
    this._AuthService
      .onRequestEmailForgetten(this.forgetEmailForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res?.message, 'success');
          this._AuthService.emailForgetValue.set(
            this.forgetEmailForm.value.email
          );
          this.ResetPasswordForm.get('email')?.setValue(
            this._AuthService.emailForgetValue()
          );
          console.log(this.forgetEmailForm.value.email);
          this.forgetsign = false;
          this.spin = false;
        },
        error: (err) => {
          console.log(err);
          if (err.error.additionalInfo?.errors) {
            this._ToastrService.error(
              `${err.error.additionalInfo?.errors?.email[0]}`,
              `Email Error`
            );
          } else {
            this._ToastrService.error(err.error.message);
          }
          this.spin = false;
        },
      });
  }

  // spin: boolean = false;
  hidepass = true;
  hideRepass = true;

  ResetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [``, [Validators.required, Validators.email]],
    seed: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  sendResetPassword() {
    console.log(this._AuthService.emailForgetValue());
    console.log('sd', this.ResetPasswordForm.value.email);
    this.spin = true;
    this._AuthService.onResetEmail(this.ResetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'success');
        this.spin = false;
        setTimeout(() => {
          this._Router.navigate(['/auth/login']);
        }, 1000);
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
          this._ToastrService.error(err.error.message);
        }
        this.spin = false;
      },
    });
  }
}
