import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  loginForm: FormGroup = this._FormBuilder.group({
    email: [
      'hossam202110044@gmail.com',
      [Validators.required, Validators.email],
    ],
    password: ['Zsacd1221@', [Validators.required]],
  });

  ngOnInit(): void {
    // this.spinner.show();
  }

  spin: boolean = false;
  eye: boolean = true;

  login() {
    // console.log('asd');
    // this.spin = true;
    console.log(this.loginForm.value);
    this._AuthService.onLogin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('asd');
        console.log(res);
        this.spin = false;
        this._ToastrService.success('Login Sucessfully', 'success');
        localStorage.setItem('foodToken', res.token);
        console.log(this._AuthService.getTokenInfo());

        if (this._AuthService.getTokenInfo().role === 'SuperAdmin') {
          this._Router.navigate(['/dashboard/admin']);
        } else {
          this._Router.navigate(['/dashboard/user']);
        }
      },
      error: (err) => {
        console.log(err);
        if (err.error?.additionalInfo?.errors) {
          this._ToastrService.error(
            err.error.additionalInfo?.errors.email,
            'Error'
          );
          console.log(err);
        } else {
          this._ToastrService.error(err?.error?.message, 'Error');
          console.log(err);
        }
        this.spin = false;
      },
    });
  }
}
