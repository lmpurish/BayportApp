import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { IRol } from '../Interface/IRol';
import { IUser } from '../Interface/IUser';
import { UserComponent } from '../layouts/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL     = "https://localhost:44357/api/user";
  private baseURLRol  = "https://localhost:44357/api/rol";
  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key:             new FormControl(null),
    username:         new FormControl('', Validators.required),
    password:         new FormControl('', Validators.required),
    repetedPassword:  new FormControl('',Validators.required),
    email:            new FormControl('',Validators.required),
    firstname:        new FormControl('', Validators.required),
    lastname:         new FormControl('',Validators.required),
    rolId:           new FormControl('',Validators.required),
  });

  chargeForm(row: any){
    this.form.patchValue({
      $key:       row.id,
      username:   row.username,
      password:   row.password,
      email:      row.email,
      firstname:  row.firstname,
      lastname:   row.lastname,
      rolId:      row.rolId,
    })

  }

  getUsers():Observable<any[]>{
    return this.http.get<any>(this.baseURL);
  }

  getUser(username): Observable<IUser>{
  return this.http.get<IUser>(this.baseURL + "/" + username);
  }

  getRol(id): Observable<IRol>{
    return this.http.get<IRol>(this.baseURLRol + "/" + id );
  }

  getRoles():Observable<any[]>{
    return this.http.get<any>(this.baseURLRol);
  }

  saveUser(user: IUser){
    return this.http.post<IUser>(this.baseURL, user);
  }

  }
  


