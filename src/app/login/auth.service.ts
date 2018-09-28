import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { Observable, Subject } from 'rxjs';
import { StubInterimsAFSService } from '../stub-interims-afs.service';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private _userDetails: firebase.User = null;
  userDetails: Subject<firebase.User>

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private afs: StubInterimsAFSService
  ) {
    this.user = this._firebaseAuth.authState;
    this.userDetails = new Subject<firebase.User>();
    this.user.subscribe(user => {
      this._userDetails = user ? user : null;
      this.userDetails.next(this._userDetails);
      if (this.isNewUser(user)) {
        console.log("So sorry, you suck so bad");
        console.log(user.providerData);
        console.log(user.providerId);
        this.logout();
        // user.delete();
      }
    });
  }

  signInWithGoogle() {
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    return this._firebaseAuth.auth.signInWithPopup(googleAuth);
  }

  isLoggedIn() {
    return this._userDetails != null;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

  isNewUser(user: firebase.User) {
    if (user) {
      const metadata = user.metadata;
      return metadata.creationTime === metadata.lastSignInTime;
    }
    return false;
  }

  signInWithEmail(email: string, password: string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => this.router.navigateByUrl('/exams'));
  }

  signUpWithEmail(email: string, password: string) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(credentials => this.afs.addUser(credentials))
      .catch(err => this.handleSignUpError(err, email, password));
  }

  handleSignUpError(err: firebase.auth.Error, email: string, password: string) {
    switch (err.code) {
      case "auth/email-already-in-use":
        console.log("Redirecting to signIn");
        return this.signInWithEmail(email, password)
      default:
        console.log("Unknown error");
        throw (err);
    }
  }
}
