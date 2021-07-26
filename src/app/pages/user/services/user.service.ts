import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { } from '@angular/fire/angularfire2';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserId: string

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
    this.currentUserId = localStorage.getItem('currentUserId') || '';
  }

  // Add User Details Data to the firestore
  addUserData(user: any): Promise<any> {

    return this.angularFirestore.collection(this.currentUserId).add(user)
      .then((response: any) => {
        return { data: { id: response.id }, success: true };;
      })
      .catch((err: any) => {
        return err;
      });

  }

  updateUserData(id:any, user: any): Promise<any> {

    return this.angularFirestore.collection(this.currentUserId).doc(id).ref.update(user)
      .then((response) => {
        return { data: response, success: true };;
      })
      .catch((err) => {
        return err;
      });

  }
  
  // Get user Details Data from the firestore
  getUserData(): Observable<any> {

    return this.angularFirestore.collection(this.currentUserId).snapshotChanges().pipe(
      map((snaps) =>
        snaps.map((snap) => {
          return {
            id: snap.payload.doc.id,
            ...(snap.payload.doc.data() as {}),
          };
        }),
      ),
    );

  }

  // Retrive Data from the firestore
  retrive(data: any): Promise<any> {

    return this.angularFirestore.collection(this.currentUserId).doc(data).ref.get()
      .then((doc) => {
        if (doc.exists) {
          return { data: [doc.data()], success: true };
        } else {
          return { data: { message: "No Data yet...", success: false } };
        }
      })
      .catch((err) => {
        return err;
      });

  }

  // Delete Data in firestore
  deleteUserData(data: any): Promise<any> {

    console.log(data)

    return this.angularFirestore.collection(this.currentUserId).doc(data).ref.delete()
      .then((doc) => {
        console.log(doc)
        return { data: [doc], success: true };
      })
      .catch((err) => {
        return err;
      });

  }

}
