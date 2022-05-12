import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = 'https://localhost:44357/api/auth/login';
  registerMode: boolean = false;

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login(credentials:any):Observable<any> {
    return this.http.post<any>(this.baseURL, credentials);
  }
}
