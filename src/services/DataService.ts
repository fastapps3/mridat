
import {Injectable} from '@angular/core';


// if you've gone with the local installation approach, you'd use the following:
//import * as firebase from 'firebase';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Injectable()
export class DataService {
  
    public db: any;
    public errorMessage:string;

    constructor() {
          /*const fbConf = {
              apiKey: "AIzaSyCGMaJar3cDMEn82HnIQwF8AyUBa8XDl5M",
              authDomain: "childnatureeval.firebaseapp.com",
              databaseURL: "https://childnatureevaluation.firebaseio.com",
              storageBucket: "childnatureevaluation.appspot.com",
              messagingSenderId: "78656440069"
        };
        firebase.initializeApp(fbConf);
      

        console.log('dataservice');
         this.db = firebase.database();//ref('/')
        //this.WriteDataToFirebase();*/
    }

    public WriteDataToFirebase(username:string,email:string):Promise<any>{    
            
      return this.db.ref('/').push({
            username:username,
            email: email
        });     
    }
}