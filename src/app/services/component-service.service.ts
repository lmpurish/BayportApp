import { Injectable } from '@angular/core';
import { Component } from '../Interface/Component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms"
import { ComponentComponent } from '../Manage/component/component.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentServiceService {

  constructor(private http: HttpClient) { }

  private baseUR = 'https://localhost:44357/api/component';

  formData:Component = new Component();
 
  getComponents(){
    return this.http.get(this.baseUR);
  }

}
