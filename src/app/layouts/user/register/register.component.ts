import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as shajs from 'sha.js';
import { MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/Interface/IUser';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  rolList: any = [];

  constructor(
    public services: UserService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    public notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.refreshRoles();
  }

  onClose() {
    this.dialogRef.close();
    this.services.form.reset();
  }

  onSubmit() {
    
    if (this.services.form.valid && (this.services.form.get('password').value == this.services.form.get('repetedPassword').value)) {
        
      const user: IUser = {
          username: this.services.form.get('username').value,
          password: shajs('sha256').update(this.services.form.get('password').value).digest('hex'),
          email: this.services.form.get('email').value,
          firstname: this.services.form.get('firstname').value,
          lastname: this.services.form.get('lastname').value,
          avatar: "",
          rolId: this.services.form.get('rolId').value,
      };
      this.services.saveUser(user).subscribe(data => {
        this.onSaveSuccess();
        this.onClose();
      });
    } else {
      this.notification.warn('::  Error in the form');
    }
    
    
  }

  onEdit(row: any) { }

  onDelete(row: any) { }

  refreshRoles() {
    this.services.getRoles().subscribe((data) => {
      this.rolList = data;
    });
  }
  onSaveSuccess() {
    this.notification.success('::  User registered successfully');
  }
}
