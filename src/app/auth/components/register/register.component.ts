import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private _Router: Router
  ) {}

  registerForm: FormGroup = this._FormBuilder.group({
    userName: [
      '',
      [Validators.required, Validators.pattern(/^[A-Za-z]+[0-9]+$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    country: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
  });

  spin: boolean = false;
  eyepass: boolean = true;
  eyerepass: boolean = true;

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

  register() {
    if (this.registerForm.valid) {
      // localStorage.setItem('emailVerify', this.registerForm.value.email);
      this._AuthService.emailVerficationValue = this.registerForm.value.email;
      // console.log('ello', this._AuthService.emailValue);

      let entries = Object.entries(this.registerForm.value);

      let myDate = new FormData();

      entries.forEach((entry) => {
        myDate.append(`${entry[0]}`, `${entry[1]}`);
      });

      myDate.append('profileImage', this.imgSrc);

      this.spin = true;
      this._AuthService.onRegister(myDate).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message, 'success');
          this.spin = false;

          setTimeout(() => {
            this._Router.navigate(['/auth/verfiy']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
          if (err.error.additionalInfo?.errors) {
            let mapErrors = new Map(
              Object.entries(err.error.additionalInfo?.errors)
            );

            // console.log(mapErrors);

            for (const [msg, val] of mapErrors) {
              this._ToastrService.error(`${val}`, `${msg} Error`);
            }
            // mapErrors.forEach((newErr: any) => {
            //   // console.log(newErr);
            //   newErr.forEach((err: any) => {
            //     this._ToastrService.error(err, 'Error');
            //   });
            // });
          } else {
            this._ToastrService.error(err.error.message, 'Error');
          }
          this.spin = false;
        },
      });
    }
  }
}
