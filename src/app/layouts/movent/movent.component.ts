import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IMovent } from 'src/app/Interface/IMovent';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import { MoventService } from 'src/app/services/movent.service';
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

  constructor(private datePipe: DatePipe, public dialogRef: MatDialogRef<MoventComponent>,public services: PositionService,public moventServices: MoventService,private fb: FormBuilder, public componentServices: ComponentServiceService) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmit(){
    const movent: IMovent={
      action: this.services.formMovent.get('action').value,
      quantity: this.services.formMovent.get('quantity').value,
      date: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
      componentId: this.componentServices.componentInUse,
    }

    this.moventServices.saveMovent(movent).subscribe(date=>{
      this.onClose();
    })
    
    console.log(movent)


  }
 
 

}

