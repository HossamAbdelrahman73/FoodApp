import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/app/core/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private _HttpClient: HttpClient) {}

  getAllRecipes(
    pageSize: number,
    pageNumber: number,
    name: string,
    tagId: string,
    categoryId: string
  ): Observable<any> {
    return this._HttpClient.get(`Recipe/`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        name: name,
        tagId: tagId,
        categoryId: categoryId,
      },
    });
  }

  updateRecipe(id: number, data: FormData): Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`, data);
  }

  getAllTags(): Observable<any> {
    return this._HttpClient.get(`tag/`);
  }

  createRecipe(data: any): Observable<any> {
    return this._HttpClient.post(`Recipe/`, data);
  }

  getSingleRecipe(id: number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`);
  }

  deleteRecipe(id: number): Observable<any> {
    return this._HttpClient.delete(`Recipe/${id}`);
  }
}
