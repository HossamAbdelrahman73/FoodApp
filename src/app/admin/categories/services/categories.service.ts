import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/app/core/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(
    pageSize: number,
    pageNumber: number,
    name: string
  ): Observable<any> {
    return this._HttpClient.get(`Category/`, {
      params: { pageSize: pageSize, pageNumber: pageNumber, name: name },
    });
  }

  addCategory(data: any): Observable<any> {
    return this._HttpClient.post(`Category`, data);
  }

  getSingleCategory(id: any): Observable<any> {
    return this._HttpClient.get(`Category/${id}`);
  }

  editCategory(id: any, word: string): Observable<any> {
    return this._HttpClient.put(`Category/${id}`, {
      name: word,
    });
  }

  deleteCategory(id: any): Observable<any> {
    return this._HttpClient.delete(`Category/${id}`);
  }

  categoryNameView: WritableSignal<string> = signal('');
}
