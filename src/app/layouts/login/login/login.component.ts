import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  hide = true;

  constructor(private router: Router, private http: HttpClient, public service: LoginService, 
    public notification: NotificationService) { }


  ngOnInit(): void {
    this.service.form.reset();
  }

  login(){
    const credentials = {
      "userName": this.service.form.value.username,
      "password": this.service.form.value.password
    }
  
   this.service.login(credentials)
    .subscribe( response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      localStorage.setItem('username',credentials.userName);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
      this.notification.success("Welcome!!!");
    }, err => {
      this.invalidLogin = true;
      this.notification.warn("Wrong credentials!!!");
    });
  }
  
  
     
  
}
