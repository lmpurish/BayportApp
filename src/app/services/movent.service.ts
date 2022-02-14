import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IMovent } from '../Interface/IMovent';



@Injectable({
  providedIn: 'root'
})
export class MoventService {

  private url = "https://localhost:44357/api/Movent"

  constructor(public http: HttpClient) { }

  saveMovent(movent: IMovent){
    return this.http.post<IMovent>(this.url, movent);
  }

}
