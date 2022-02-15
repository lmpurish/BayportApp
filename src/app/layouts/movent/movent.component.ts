import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IMovent } from 'src/app/Interface/IMovent';
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

  constructor(private datePipe: DatePipe, private notification: NotificationService, public dialogRef: MatDialogRef<MoventComponent>, public services: PositionService, public moventServices: MoventService, private fb: FormBuilder, public componentServices: ComponentServiceService) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
    this.services.formMovent.reset();
  }

  onSubmit() {
    if (this.services.formMovent.valid) {
      const movent: IMovent = {
        action: this.services.formMovent.get('action').value,
        quantity: this.services.formMovent.get('quantity').value,
        date: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        componentId: this.componentServices.componentInUse,
      }

      this.moventServices.saveMovent(movent).subscribe(date => {
        this.onClose();
        this.services.formMovent.reset();
        this.notification.success(":: Action Successfully")
      })
    }

  }
  addPosition() {
    let positionArr = this.services.formMovent.get('positions') as FormArray;
    let positionFG = this.buildPosition();
    positionArr.push(positionFG);
    
  }
  getControls() {
    return (this.services.formMovent.get('positions') as FormArray).controls;
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
}

