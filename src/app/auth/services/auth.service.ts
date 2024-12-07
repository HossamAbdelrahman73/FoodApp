import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

import { Ilogininfo } from '../interfaces/ilogininfo';
import { env } from 'src/app/core/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  emailVerficationValue: string = '';
  emailForgetValue: WritableSignal<string> = signal('');

  getTokenInfo() {
    let decodeToken: any = jwtDecode(localStorage.getItem('foodToken')!);

    let infoUser: Ilogininfo = {
      userName: decodeToken.userName,
      role: decodeToken.userGroup,
      userEmail: decodeToken.userEmail,
      userId: decodeToken.userId,
    };

    return infoUser;
  }

  name: WritableSignal<string> = signal('');

  onLogin(data: any): Observable<any> {
    // debugger;
    return this._HttpClient.post(`Users/Login`, data);
  }

  onRegister(data: FormData): Observable<any> {
    return this._HttpClient.post(`Users/Register`, data);
  }
  onVerifyAcount(data: any): Observable<any> {
    return this._HttpClient.put(`Users/verify`, data);
  }
  onRequestEmailForgetten(data: any): Observable<any> {
    return this._HttpClient.post(`Users/Reset/Request`, data);
  }
  onResetEmail(data: any): Observable<any> {
    return this._HttpClient.post(`Users/Reset`, data);
  }

  getCurrentUser(): Observable<any> {
    return this._HttpClient.get(`Users/currentUser`);
  }
}
