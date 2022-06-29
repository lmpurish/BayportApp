import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct } from '../Interface/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "https://localhost:44357/api/product";
  editMode: boolean = false;
  @Output() chargeProduct : EventEmitter<any> = new EventEmitter();

  constructor(private http:HttpClient) { }

  form: FormGroup = new FormGroup({
    $key:         new FormControl(null),
    name:         new FormControl('', Validators.required),
    itemCode:     new FormControl('', Validators.required),
    description:  new FormControl('', Validators.required),
    projectId:    new FormControl('', Validators.required),
    picture:      new FormControl('', Validators.required),
  });

  
  getProducts():Observable<any>{
    return this.http.get<any>(this.baseURL);
  }
  saveProduct(customer: IProduct){
    return this.http.post<IProduct>(this.baseURL, customer);
  }

  updateProduct(customer: IProduct):Observable<IProduct>{
    return this.http.put<IProduct>(this.baseURL+'/'+ customer._id.toString() ,customer);
  }
  deleteProduct(id: any):Observable<IProduct>{
    return this.http.delete<IProduct>(this.baseURL+'/'+id);
  }
}
