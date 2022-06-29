import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IComponent } from 'src/app/Interface/IComponent';
import { ComponentServiceService } from 'src/app/services/component-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css'],
})
export class NewComponentComponent implements OnInit {
  file: File;
  photoSelected: any;
  productList: any = [];
  types = [
    { value: 'Component' },
    { value: 'RowMaterial' },
    { value: 'Spendable' },
  ];
  constructor(
    public dialogRef:     MatDialogRef<NewComponentComponent>,
    public service:       ComponentServiceService,
    private route:        Router,
    public notification:  NotificationService,
    public uploadService: UploadFileService
  ) 
  {

  }

  ngOnInit(): void {
    this.refresshProductList();
  }

  onClose() {
    this.dialogRef.close();
    this.service.form.reset();
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
    if (false) return 'assets/' + this.service.form.get('picture')?.value;
    return this.photoSelected;
  }
  onSubmit() {
    if (this.service.form.valid) {
      const component: IComponent = {
        name: this.service.form.get('name').value,
        description: this.service.form.get('description').value,
        itemCode: this.service.form.get('itemCode').value,
        barCode: this.service.form.get('barCode').value,
        picture: this.file.name,
        productid: this.service.form.get('product').value,
        type: this.service.form.get('type').value,
      };
      this.service.saveComponent(component).subscribe((data) => {
        this.uploadService.uploadFile(this.file);
        this.onSaveSuccess();
        this.onClose();
      });
    }
  }
  onSaveSuccess() {
    this.notification.success('::  Submitted successfully');
    this.service.chargeComponent.emit();
  }

  refresshProductList() {
    this.service.getProducts().subscribe((data) => {
      this.productList = data;
    });
  }
}
