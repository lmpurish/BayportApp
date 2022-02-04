import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PositionsComponent>, public services: PositionService ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  Save(){
  console.table();
  }



}
