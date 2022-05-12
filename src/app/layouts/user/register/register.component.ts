import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public services:      UserService,
    public dialogRef:     MatDialogRef<RegisterComponent>,
    public notification: NotificationService
  ) { }

  ngOnInit(): void {
  }


  onClose(){
    this.dialogRef.close();
    this.services.form.reset();
  }

  onSubmit(){}

  onEdit(row:any){}

  onDelete(row:any){}
}
