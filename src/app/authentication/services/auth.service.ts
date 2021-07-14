import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private afa: AngularFireAuth,
    private router: Router,
  ) {
    this.afa.authState.subscribe((auth => {
      this.authState = auth;
    }))

  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }


  //  User Registeration
  userRegisteration(formValue: any): Promise<any> {

    return this.afa.createUserWithEmailAndPassword(formValue.email, formValue.password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        throw error
      });

  }

  //  User Login
  userLogin(formValue: any): Promise<any> {

    return this.afa.signInWithEmailAndPassword(formValue.email, formValue.password)
      .then((user) => {
        this.authState = user;
        // Setting data to localstorage
        localStorage.setItem('currentUserEmail', this.authState.user.email);
        localStorage.setItem('currentUser', this.authState.user.refreshToken);
      })
      .catch(error => {
        throw error
      });

  }

  // User Logout
  userLogout() {
    localStorage.clear();
    this.afa.signOut().then( () => this.router.navigate(['/authentication/login']) );
  }

}
