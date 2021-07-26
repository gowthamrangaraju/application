import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(
    private afa: AngularFireAuth,
    private angularFirestore: AngularFirestore,
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
        this.angularFirestore.collection('users').doc(this.currentUserId).ref.set({ email: this.authState.user.email });
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
        localStorage.setItem('currentUserId', this.authState.user.uid);
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
