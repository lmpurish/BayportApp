import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { IProject } from '../Interface/IProject';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseURL = "https://localhost:44357/api/project";
  editMode: boolean = false;
  @Output() chargeProject : EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    projectManager: new FormControl('', Validators.required),
    customerId: new FormControl('', Validators.required)
  });

  
  getProjects():Observable<any>{
    return this.http.get<any>(this.baseURL);
  }
  saveProject(customer: IProject){
    return this.http.post<IProject>(this.baseURL, customer);
  }

  updateProject(customer: IProject):Observable<IProject>{
    return this.http.put<IProject>(this.baseURL+'/'+ customer._id.toString() ,customer);
  }
  deleteProject(id: any):Observable<IProject>{
    return this.http.delete<IProject>(this.baseURL+'/'+id);
  }



}
