import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/Interface/IProduct';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  projectList:any=[];

  constructor(public services: ProductService,public projectService: ProjectService, public dialogRef: MatDialogRef<NewProductComponent>, public notification: NotificationService) { }
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
        const project: IProduct={
          _id:this.services.form.get('$key').value,
          name: this.services.form.get('name').value,
          description: this.services.form.get('description').value,
          itemCode: this.services.form.get('itemCode').value,
          projectId: this.services.form.get('projectId').value,
        }
        this.services.updateProduct(project).subscribe(data=>{
          this.services.editMode= false;
          this.onSaveSuccess(":: Modify successfully");
          this.onClose();
        })

      }
    else{
      const project: IProduct={
        name: this.services.form.get('name').value,
        description: this.services.form.get('description').value,
        itemCode: this.services.form.get('itemCode').value,
        projectId: this.services.form.get('projectId').value,
      }
      this.services.saveProduct(project).subscribe(data => {
      this.onSaveSuccess(':: Submitted successfully');
      this.onClose();
    });
    }
      
    }
  }

  onSaveSuccess(msg:any){
    this.notification.success(msg);
    window.location.reload();
  }
  refreshProjectList(){
    this.projectService.getProjects().subscribe(data=>{
    this.projectList=data;
    });
  }

}
