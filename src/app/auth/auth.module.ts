import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VerfiyEmailComponent } from './components/verfiy-email/verfiy-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerfiyEmailComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    // NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  providers: [],
  exports: [AuthComponent],
})
export class AuthModule {}
