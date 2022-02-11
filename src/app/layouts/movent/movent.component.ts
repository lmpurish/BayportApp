import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IMovent } from 'src/app/Interface/IMovent';
import { Position } from 'src/app/Interface/position';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import { MoventService } from 'src/app/services/movent.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-movent',
  templateUrl: './movent.component.html',
  styleUrls: ['./movent.component.css']
})
export class MoventComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MoventComponent>,private notification: NotificationService, public services: MoventService, public positionServices: PositionService, public componentServices: ComponentServiceService) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.services.form.valid){
      const movent: IMovent={
        action: "Input",
        componentId: this.componentServices.componentInUse,
        date: new Date(),
        quantity: this.services.form.get('quantity').value,
      }
      const position: Position={
        rack: this.services.form.get('position').value,
        quantity: this.services.form.get('quantity').value,
        inUse: true,
        perCarton:this.services.form.get('perCarton').value,
        componentId: this.componentServices.componentInUse
      }
      this.services.saveMovent(movent).subscribe(data=>{})
      this.positionServices.savePosition(position).subscribe(data=>{
        this.notification.success(":: Input Successfully")
        this.onClose();
      });
      


    }
  }

}
