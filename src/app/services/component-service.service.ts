import { Injectable } from '@angular/core';
import { Component } from '../Interface/Component';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms"
import { ComponentComponent } from '../Manage/component/component.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentServiceService {

  constructor(private http: HttpClient) { }

  private baseUR = 'https://localhost:44357/api/component';

  
  componentInUse: any;
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    itemCode: new FormControl('', Validators.required),
    barCode: new FormControl('', Validators.required),
    picture: new FormControl(''),
    perCarton: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  });
 
  getComponents(){
    return this.http.get(this.baseUR);
  }

  getComponent(id:any): Observable<Component>{
    let params= new HttpParams().set('includePositions', true);
    return this.http.get<Component>(this.baseUR + '/' + id, {params: params});
  }

  setComponent(Component: any){
    this.componentInUse = Component;
  }

  

}
