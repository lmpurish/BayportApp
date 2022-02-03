import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<NewComponentComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();

  }

}
