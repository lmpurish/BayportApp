import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMovent } from '../Interface/IMovent';


@Injectable({
  providedIn: 'root'
})
export class MoventService {

  private url = 'https://localhost:44357/api/movent'

  constructor(public http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    quantity: new FormControl(' ', Validators.required),
    perCarton: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
  });

  saveMovent(movent: IMovent){
    return this.http.post<IMovent>(this.url, IMovent);
  }

}
