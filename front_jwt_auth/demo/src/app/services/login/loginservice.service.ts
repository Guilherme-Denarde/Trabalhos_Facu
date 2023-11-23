import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class Loginservice {

  private loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) { }

  logar(loginData: Login): Observable<any> {     
    return this.http.post<Login>(this.loginUrl, loginData);
  }
}
