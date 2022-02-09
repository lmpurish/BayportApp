import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialogRef } from '@angular/material/dialog';

import { ComponentServiceService } from 'src/app/services/component-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ICustomer } from 'src/app/Interface/ICustomer';

@Component({
  selector: 'app-new-customner',
  templateUrl: './new-customner.component.html',
  styleUrls: ['./new-customner.component.css']
})
export class NewCustomnerComponent implements OnInit {

  constructor(public services: CustomerService,public dialogRef: MatDialogRef<NewCustomnerComponent>, public notification: NotificationService) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close();
    this.services.form.reset();
  }

  onSubmit(){
    if(this.services.form.valid){
      const component: ICustomer={
        name: this.services.form.get('name').value,
        contact: this.services.form.get('contact').value,
      }
      this.services.saveCustomer(component).subscribe(data => {
      this.onSaveSuccess();
      this.onClose();
    });
    }
  }

  onSaveSuccess(){
    window.location.reload();
    this.notification.success(':: Submitted successfully');

  }

}
