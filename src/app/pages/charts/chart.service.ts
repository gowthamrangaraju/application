import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  // get Chart data from firebase
  getChartData() : Observable<any>{
    return this.angularFirestore.collection('testCollection').valueChanges();
  }
}
