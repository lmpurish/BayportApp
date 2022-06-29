import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/Interface/IProduct';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { ProjectService } from 'src/app/services/project.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  projectList:any=[];
  file: File;
  photoSelected: any;

  constructor(
    public services:        ProductService,
    public projectService:  ProjectService,
    public dialogRef:       MatDialogRef<NewProductComponent>,
    public notification:    NotificationService,
    public uploadService:   UploadFileService,
    ) { }

  ngOnInit(): void {
    this.refreshProjectList();
  }
  onClose(){
    this.dialogRef.close();
    this.services.form.reset();
    this.services.editMode=false;
  }

  onSubmit(){
    if(this.services.form.valid){

      if(this.services.editMode){
        const product: IProduct={
          _id:          this.services.form.get('$key').value,
          name:         this.services.form.get('name').value,
          description:  this.services.form.get('description').value,
          itemCode:     this.services.form.get('itemCode').value,
          projectId:    this.services.form.get('projectId').value,
          picture:      this.file.name,
        }
        this.services.updateProduct(product).subscribe(data=>{
          this.services.editMode = false;
          this.onSaveSuccess(":: Modify successfully");
          this.onClose();
        })

      }
    else{
      const product: IProduct={
        name:         this.services.form.get('name').value,
        description:  this.services.form.get('description').value,
        itemCode:     this.services.form.get('itemCode').value,
        projectId:    this.services.form.get('projectId').value,
        picture:      this.file.name,

      }
      this.services.saveProduct(product).subscribe(data => {
      this.uploadService.uploadFile(this.file);
      this.onSaveSuccess(':: Submitted successfully');
      this.onClose();
    });
    }
      
    }
  }

  onSaveSuccess(msg:any){
    this.notification.success(msg);
    this.services.chargeProduct.emit();
  }
  refreshProjectList(){
    this.projectService.getProjects().subscribe(data=>{
    this.projectList=data;
    });
  }

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file     = <File>event.target.files[0];
      const reader  = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => (this.photoSelected = reader.result);
    }
  }
  showPicture() {
    if (false) return 'assets/' + this.services.form.get('picture')?.value;
    return this.photoSelected;
  }

}
