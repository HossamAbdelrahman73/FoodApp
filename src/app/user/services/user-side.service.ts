import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSideService {
  constructor(private _HttpClient: HttpClient) {}

  onAddFav(id: number): Observable<any> {
    return this._HttpClient.post(`userRecipe/`, {
      recipeId: id,
    });
  }
  onDeleteFav(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`);
  }

  getAllFav(): Observable<any> {
    return this._HttpClient.get(`userRecipe/`);
  }
}
