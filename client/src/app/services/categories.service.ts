import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  enviorement = 'http://localhost:3000/api/v1'
  
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.enviorement}/categories`)
  }
  
  postCategories(category: Category): Observable<Category>{
    return this.http.post<Category>(`${this.enviorement}/categories`, category)
  }

  removeCategory(categoryId: string): Observable<Object>{
    return this.http.delete<Object>(`${this.enviorement}/categories/${categoryId}`)
  }

  getCategory(categoryId: string): Observable<Category>{
    return this.http.get<Category>(`${this.enviorement}/categories/${categoryId}`)
  }

  updateCategory(categoryId: string, data: Category): Observable<Category>{
    return this.http.put<Category>(`${this.enviorement}/categories/${categoryId}`, data)
  }
}
