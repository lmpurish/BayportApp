import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient) { }


  ngOnInit(): void {
  }

  login(form: NgForm){
    const credentials = {
      "userName": form.value.username,
      "password": form.value.password
    }

    this.http.post("http://localhost:5001/api/auth/login");
      .subscribe( response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(["/"];)
      }, err => {
        this.invalidLogin = true;
      })
  }
}
