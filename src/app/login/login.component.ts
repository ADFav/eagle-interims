import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  alert: string;
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    return this.auth.signInWithGoogle()
  }

  signUpWithEmail() {
    return this.auth.signUpWithEmail(this.email, this.password)
      .catch(err => this.alert = err.message);
  }

  logout() {
    return this.auth.logout();
  }

}
