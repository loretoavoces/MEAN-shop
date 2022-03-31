import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  enviorement = 'http://localhost:3000/api/v1'
  
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.enviorement}/products`)
  }

  getProduct(productId: string): Observable<Product>{
    return this.http.get<Product>(`${this.enviorement}/products/${productId}`)
  }

  removeProduct(productId: string): Observable<Object>{
    return this.http.delete<Object>(`${this.enviorement}/products/${productId}`)
  }
    
  updateProduct(productId: string, data: FormData): Observable<Product>{
    return this.http.put<Product>(`${this.enviorement}/products/${productId}`, data)
  }

  postCategories(product: FormData): Observable<Product>{
    return this.http.post<Product>(`${this.enviorement}/products`, product)
  }


  uploadImages(image: any): Observable<any> {
    return this.http.post<any>(`${this.enviorement}/upload`, image)
  }

}
