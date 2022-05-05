import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "https://localhost:5001/api/user";
  constructor(private http: HttpClient) { }

  getUsers():Observable<any[]>{
    return this.http.get<any>(this.baseURL);
  }
  
}

