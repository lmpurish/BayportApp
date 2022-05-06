import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public userservices: UserService) {}

  username: any;
  firstName: any;
  lastName: any;
  avatar: any;
  email: any;
  rolname: string = '';

  ngOnInit(): void {
    this.chargeUser();
  }

  chargeUser() {
    if (this.isLoggedIn) {
      this.userservices
        .getUser(localStorage.getItem('username'))
        .subscribe((response) => {
          this.username = response.username;
          this.firstName = response.firstname;
          this.lastName = response.lastname;
          this.avatar = response.avatar;
          this.email = response.email;
          this.userservices.getRol(response.rolId).subscribe((res) => {
            this.rolname = res.rolname;
          });
        });
    }
  }

  getRol(id: number) {
    return this.userservices.getRol(id);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('jwt');

    return authToken !== null ? true : false;
  }
}
