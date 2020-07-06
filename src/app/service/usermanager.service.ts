import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {
  // private options = {headers: new HttpHeaders().set('Content-Type', 'applicatiion/json')}

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An erro occurred: ', error.error.message);
    }else {
      alert(error.error.non_field_errors);
    }
    return throwError('Something bad happened; please type again later');
  }

  authenticate(username: string, password: string){
    const data = {'username': username, 'password': password};
    return this.http.post(`${environment.apiUrl}/api/login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }
}
