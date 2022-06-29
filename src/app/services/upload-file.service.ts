import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUR = 'https://localhost:44357/api/Upload';
  
  public progress: number | undefined;
  public message: string | undefined;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

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
}
