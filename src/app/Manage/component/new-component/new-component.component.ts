import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponentServiceService } from 'src/app/services/component-service.service';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<NewComponentComponent>, public service: ComponentServiceService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();

  }

}
