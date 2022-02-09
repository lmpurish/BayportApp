import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms"
import { ComponentComponent } from '../Manage/component/component.component';
import { Observable } from 'rxjs';
import { ICustomer } from '../Interface/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "https://localhost:44357/api/customer";

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
  });

  getCustomers(){
    return this.http.get(this.baseURL);
  }

  saveCustomer(customer: ICustomer){
    return this.http.post<ICustomer>(this.baseURL, customer);
  }


}
