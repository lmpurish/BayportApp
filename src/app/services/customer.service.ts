import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms"
import { ComponentComponent } from '../Manage/component/component.component';
import { Observable } from 'rxjs';
import { ICustomer } from '../Interface/ICustomer';
import { CustomerComponent } from '../Manage/customer/customer.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "https://localhost:44357/api/customer";
  editMode: boolean = false;

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
  });

  chargeForm(row: any){
    this.form.patchValue({
      $key: row.id,
      name : row.name,
      contact: row.contact
    })

  }

  getCustomers(){
    return this.http.get(this.baseURL);
  }

  saveCustomer(customer: ICustomer){
    return this.http.post<ICustomer>(this.baseURL, customer);
  }

  updateCustomer(customer: ICustomer):Observable<ICustomer>{
    return this.http.put<ICustomer>(this.baseURL+'/'+ customer._id.toString() ,customer);
  }
  deleteCustomer(id: any):Observable<ICustomer>{
    return this.http.delete<ICustomer>(this.baseURL+'/'+id);
  }


}
