import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Position } from '../Interface/position';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  componentId: number;
  private url = 'https://localhost:44357/api/position'

  formMovent: FormGroup= new FormGroup({
    $Key: new FormControl(null),
    action: new FormControl('', Validators.required),
    quantity: new FormControl(0, Validators.required),
    positions: this.fb.array([])
  })

  initializeFormGroup() {
    this.formMovent.setValue({
      $key: new FormControl(null),
      rack: '',
      action: true,
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
