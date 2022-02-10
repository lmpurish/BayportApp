import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProject } from 'src/app/Interface/IProject';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  customerList:any=[];

  constructor(public services: ProjectService, public customerService: CustomerService,public dialogRef: MatDialogRef<NewProjectComponent>, public notification: NotificationService) { }

  ngOnInit(): void {
    this.refreshCustomersList();
  }
  onClose(){
    this.dialogRef.close();
    this.services.form.reset();
    this.services.editMode=false;
  }

  onSubmit(){
    if(this.services.form.valid){

      if(this.services.editMode){
        const project: IProject={
          _id:this.services.form.get('$key').value,
          name: this.services.form.get('name').value,
          projectManager: this.services.form.get('projectManager').value,
          customerId: this.services.form.get('customer').value,
        }
        this.services.updateProject(project).subscribe(data=>{
          this.services.editMode= false;
          this.onSaveSuccess(":: Modify successfully");
          this.onClose();
        })

      }
    else{
      const project: IProject={
        name: this.services.form.get('name').value,
        projectManager: this.services.form.get('projectManager').value,
        customerId: this.services.form.get('customerId').value
      }
      this.services.saveProject(project).subscribe(data => {
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
  refreshCustomersList(){
    this.customerService.getCustomers().subscribe(data=>{
    this.customerList=data;
    
    });
  }
}
