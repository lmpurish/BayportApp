import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRol } from '../Interface/IRol';
import { IUser } from '../Interface/IUser';
import { UserComponent } from '../layouts/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "https://localhost:5001/api/user";
  constructor(private http: HttpClient) { }

  getUsers():Observable<any[]>{
    return this.http.get<any>(this.baseURL);
  }

  getUser(username): Observable<IUser>{
  return this.http.get<IUser>(this.baseURL+"/"+username);
  }

  getRol(id): Observable<IRol>{
    return this.http.get<IRol>("https://localhost:5001/api/rol/" + id );
  }

  getRoles():Observable<any[]>{
    return this.http.get<any>("https://localhost:5001/api/rol");
  }

  }
  


