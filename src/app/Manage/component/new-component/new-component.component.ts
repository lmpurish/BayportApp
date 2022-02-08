import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IComponent } from 'src/app/Interface/IComponent';
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
if(this.service.form.valid){
  const component: IComponent={
    name: this.service.form.get('name').value,
    description: this.service.form.get('description').value,
    itemCode: this.service.form.get('itemCode').value,
    barCode: this.service.form.get('barCode').value,
    picture: this.file.name,
  }
  this.service.saveComponent(component).subscribe(data => {
   this.service.uploadFile(this.file);
   console.log('guardado exitosamente');
   this.onClose();
 });
 }
}
 

}
