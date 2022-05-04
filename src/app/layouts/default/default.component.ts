import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  sideBarOpen = true;

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  isUserAuthenticated(){
    const token: string = localStorage.getItem('jwt');

    if(token && !this.jwtHelper.isTokenExpired(token) ){
      return true;
    }
    else{
      return false;
    }
  }

  
}
