import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  user: User;
  userName: string;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.userDetails.subscribe(user => {
      console.log("something happened");
      this.loggedIn = !!user;
      this.user = user;
      this.userName = this.user ? this.user.userName : "";
    })
  }

  logout() {
    this.auth.logout();
  }

}
