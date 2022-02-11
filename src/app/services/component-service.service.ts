import { EventEmitter, Inject,Injectable, Output } from '@angular/core';
import { IComponent } from '../Interface/IComponent';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms"
import { ComponentComponent } from '../Manage/component/component.component';
import { Observable } from 'rxjs';
import { IProduct } from '../Interface/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ComponentServiceService {

  public progress: number | undefined;
  public message: string | undefined;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  private baseUR = 'https://localhost:44357/api/component';
  private URLProduct = 'https://localhost:44357/api/Product';

  componentInUse: any;
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    itemCode: new FormControl('', Validators.required),
    barCode: new FormControl('', Validators.required),
    picture: new FormControl('',Validators.required),
    product: new FormControl('',Validators.required),
    type: new FormControl('', Validators.required),

    
  });
 
  getComponents(){
    return this.http.get(this.baseUR);
  }

  getComponent(id: number): Observable<any>{
    let params= new HttpParams().set('includePositions', true);
    return this.http.get<ComponentComponent>(this.baseUR + '/' + id, {params: params});
  }

  setComponent(id: any){
    this.componentInUse = id;
  }
  saveComponent(component: IComponent): Observable<IComponent> {
    return this.http.post<IComponent>(this.baseUR, component);
  }

  public uploadFile = (file:  File) => {
    
    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(this.baseUR+ '/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

  getProducts():Observable<any[]>{
    return this.http.get<any>(this.URLProduct);
  }
  
  deleteComponent(id: any):Observable<IComponent>{
    return this.http.delete<IComponent>(this.baseUR+'/'+id);
  }


  

}
