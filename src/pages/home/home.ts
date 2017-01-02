import { Component } from '@angular/core';

import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { FacultyDetails} from '../../models/FacultyDetails';
import { FirebaseService} from '../../services/firebase.service';
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
   providers: [FirebaseService]
})
export class HomePage {
  faculty_details: FacultyDetails[];
  constructor(private _data: AngularFire,public childEvaluationApi:FirebaseService) {

  }

  ionViewWillEnter() {
     this.childEvaluationApi.getFacultiesDetails().subscribe((data)=>{
         this.faculty_details=data;
         console.log(data);
      });
   } 
}
