import { AfterViewInit, Component, HostListener, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { ICustomer } from 'src/app/Interface/ICustomer';
import { CustomerComponent } from '../customer.component';
import { ComponentComponent } from '../../component/component.component';


@Component({
  selector: 'app-new-customner',
  templateUrl: './new-customner.component.html',
  styleUrls: ['./new-customner.component.css']
})
export class NewCustomnerComponent implements OnInit {

  @Output() chargeCustomer = new EventEmitter();
    constructor(
      public services: CustomerService,
      public dialogRef: MatDialogRef<NewCustomnerComponent>,
      public notification: NotificationService) {

  }

  ngOnInit(): void {
  }


  onClose() {
    this.dialogRef.close();
    this.services.form.reset();
    this.services.editMode = false;
  }

  onSubmit() {
    if (this.services.form.valid) {

      if (this.services.editMode) {
        const customer: ICustomer = {
          _id: this.services.form.get('$key').value,
          name: this.services.form.get('name').value,
          contact: this.services.form.get('contact').value,
        }
        this.services.updateCustomer(customer).subscribe(data => {
          this.services.editMode = false;
          this.onSaveSuccess(":: Modify successfully");

        })

      }
      else {
        const customer: ICustomer = {
          name: this.services.form.get('name').value,
          contact: this.services.form.get('contact').value,
        }
        this.services.saveCustomer(customer).subscribe(data => {
          this.onSaveSuccess(':: Submitted successfully');
          this.onClose();
        });
       
      }

    }
  }

  onSaveSuccess(msg: any) {
    this.notification.success(msg);
    this.onClose();
  }

}
