import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { Observable, Subject } from 'rxjs';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { InterimsAFSService } from 'src/app/interims-afs.service';
import { User } from 'src/app/models/user';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private _userDetails: User = null;
  userDetails: Subject<User>

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private afs: InterimsAFSService
  ) {
    this.user = this._firebaseAuth.authState;
    this.userDetails = new Subject<User>();
    this.user.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.addOrFetch(firebaseUser)
          .then(user => {
            this._userDetails = user ? user.data : null;
            this.userDetails.next(this._userDetails)
            return user;
          }).then(user => this.router.navigateByUrl('/exams'));
      } else {
        this._userDetails = null;
        this.userDetails.next(this._userDetails)
        this.router.navigateByUrl("/");
      }
    });
  }

  addOrFetch(firebaseUser: firebase.User) {
    if (this.isNewUser(firebaseUser)) {
      return this.afs.addUser(firebaseUser);
    } else {
      return this.afs.fetchUser(firebaseUser);
    }
  }

  signInWithGoogle() {
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    return this._firebaseAuth.auth.signInWithPopup(googleAuth)
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
  }

  signUpWithEmail(email: string, password: string) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
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
