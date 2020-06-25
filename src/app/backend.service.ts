import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../app/components/product'

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiUrl = environment.apiUrl;
 httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json'
   })
 }
  constructor( private httpClient: HttpClient) { }

  // GET: returns all the products
  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // GET: returns a single product that matches the id provided
  getProductById(id): Observable<Product>{
    return this.httpClient.get<Product>(`${this.apiUrl}/products/${id}`)
  }

  // POST: request to create a product
  createproduct(product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/products`, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // PUT: function to an exisiting product
  updateProduct(id, product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/products/${id}`, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // DELETE: function to delete a product with that particular ID
  deleteProduct(id): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      // Get client-side error
      errorMessage = error.error.message;
    }else {
      // Get server side error
      errorMessage = `Error code: ${error.status}\nMessage : ${error.error}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
