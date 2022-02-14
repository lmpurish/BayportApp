import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Position } from '../Interface/position';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  componentId: number;
  private url = 'https://localhost:44357/api/position'

  form: FormGroup= new FormGroup({
    $Key: new FormControl(null),
    rack: new FormControl('', Validators.required),
    inUse: new FormControl(true, Validators.required),
    quantity: new FormControl(0, Validators.required),
    fecha: new FormControl(),
    
  })

  initializeFormGroup() {
    this.form.setValue({
      $key: new FormControl(null),
      rack: '',
      inUse: true,
      quantity: 0,
      comoponentId: this.componentId
    });
  }

  chargePosition(row){
    this.componentId = row.comoponentId;
  }

  savePosition(position: Position) {
    return this.http.post<Position>(this.url, position);
  }
  


}
