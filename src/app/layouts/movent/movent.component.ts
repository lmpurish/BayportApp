import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IMovent } from 'src/app/Interface/IMovent';
import { Position } from 'src/app/Interface/position';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import { MoventService } from 'src/app/services/movent.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-movent',
  templateUrl: './movent.component.html',
  styleUrls: ['./movent.component.css'],
  providers: [DatePipe]
})
export class MoventComponent implements OnInit {

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  date = new Date();
  positionToRemove: number[] = [];
  positionsArray: any;
  inputVisibility = true;
  outputVisibility = true;

  constructor(private datePipe: DatePipe, private notification: NotificationService, public dialogRef: MatDialogRef<MoventComponent>, public services: PositionService, public moventServices: MoventService, private fb: FormBuilder, public componentServices: ComponentServiceService) { }

  ngOnInit(): void {
    this.addPosition();
  }
  onClose() {
    this.resetPositions();
    this.services.formMovent.reset();
    this.dialogRef.close();

  }

  onSubmit() {
    if (this.services.formMovent.valid) {
      const movent: IMovent = {
        action: this.services.formMovent.get('action').value,
        quantity: this.services.formMovent.get('quantity').value,
        date: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        componentId: this.componentServices.componentInUse,
      }
      this.positionsArray = this.services.formMovent.get('positions');
      for (let c of this.positionsArray.controls) {
        const position: Position = {
          rack: c.get('rack').value,
          quantity: c.get('quantity').value,
          perCarton: c.get('perCarton').value,
          componentId: this.componentServices.componentInUse,
          inUse: true,
        }
        this.services.savePosition(position).subscribe(date => {
        })
      }
      this.moventServices.saveMovent(movent).subscribe(date => {
        this.onClose();
        this.services.formMovent.reset();
        this.notification.success(":: Action Successfully")
      })
    }
  }

  validateQuantity() {
    let quanntity = 0;
    this.positionsArray = this.services.formMovent.get('positions');

    for (let c of this.positionsArray.controls) {
      quanntity += c.get('quantity').value;
    }
    if (quanntity == this.services.formMovent.get('quantity').value && this.services.formMovent.get('quantity').value > 0)
      return true;
    else
      return false;
  }

  addPosition() {
    let positionArr = this.services.formMovent.get('positions') as FormArray;
    let positionFG = this.buildPosition();
    positionArr.push(positionFG);
  }

  getControls() {
    return (this.services.formMovent.get('positions') as FormArray).controls;
  }

  resetPositions() {
    let positionArr = this.services.formMovent.get('positions') as FormArray;
    let qty = positionArr.length;

    for (let i = 0; i < qty; i++) {
      positionArr.removeAt(qty - i);
    }
    positionArr.removeAt(0);

  }


  buildPosition() {
    return this.fb.group({
      id: 0,
      rack: '',
      quantity: '',
      perCarton: '',
      componentId: this.componentServices.componentInUse,
    })
  }

  removePosition(index: number) {
    let positionArr = this.services.formMovent.get('positions') as FormArray;
    let positionRemove = positionArr.at(index) as FormGroup;
    if (positionRemove.controls['id'].value != '0') {
      this.positionToRemove.push(<number>positionRemove.controls['id'].value);
    }
    positionArr.removeAt(index);
  }

  inputForm() {
    this.inputVisibility = !this.inputVisibility;
    this.outputVisibility = true;
  }

  outputForm() {
    this.outputVisibility = !this.outputVisibility;
    this.inputVisibility = true;
  }

  validateForm() {
    if (this.services.formMovent.valid && this.validateQuantity())
      return false;
    return true;
  }
}

