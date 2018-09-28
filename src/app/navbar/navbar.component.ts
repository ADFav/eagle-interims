import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  user: firebase.User;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.userDetails.subscribe(user =>{
      this.loggedIn = !!user;
      this.user = user;
    })
  }

  logout(){
    this.auth.logout();
  }

}
