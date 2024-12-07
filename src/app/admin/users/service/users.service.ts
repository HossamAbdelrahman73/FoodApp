import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}

  getUsers(parms: any): Observable<any> {
    return this._HttpClient.get('Users/', {
      params: parms,
    });
  }

  deleteUserbyId(id: number): Observable<any> {
    return this._HttpClient.delete(`Users/${id}`);
  }
}
