import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponentServiceService } from 'src/app/services/component-service.service';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit {

  file: File;
  photoSelected: any;
  constructor( public dialogRef: MatDialogRef<NewComponentComponent>, public service: ComponentServiceService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
    this.service.form.reset();

  }
  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => this.photoSelected = reader.result;
    }
  }
  showPicture() {
    if (false)
      return "assets/"+this.service.form.get('picture')?.value
    return this.photoSelected;
}
onSubmit(){
console.log("hola");

}

}
