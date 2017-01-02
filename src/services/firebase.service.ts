import { Injectable} from "@angular/core";
import { Http, Response } from '@angular/http';
import {FirebaseAuthState} from 'firebase/auth';
import {FirebaseAuth, AngularFire, FirebaseListObservable,AuthProviders, AuthMethods } from 'angularfire2';

import { FacultyDetails} from '../models/FacultyDetails';
import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FirebaseService {

    //private baseUrl = 'https://childnatureevaluation.firebaseio.com';
  
    faculty_details: FirebaseListObservable<FacultyDetails[]>;
    public fireAuth: any;
    public userProfile: any;

    constructor(private http: Http,public _data: AngularFire,private auth: FirebaseAuth) {
          this.fireAuth = _data.auth;
          _data.auth.subscribe(auth => {
            console.log('subscribed');
            console.log(auth);
          }
          );
         // this.userProfile = _data.auth.
    }

    createUserWithEmailAndPassword(_email:string, _password:string){
       return this._data.auth.createUser(
            {
                email:_email,
                password:_password
            }).then(
                (success)=>{
                    console.log(success);
                }
            ).catch(
                (error)=>{
                    console.log(error);
                }
            );
    }

    signInWithGoogle(){
       // console.log('Google sign-in')
        return this.auth.login(this.getProvider('google'))
        /*.then((value) => {
                console.log("Success");
                console.log(value);
            }).catch((error) => {
                console.log("Failure");
                console.log(error);
            });*/
        
        //return this._data.auth.login();
    }

    signInWithEmailAndPassword(_email:string, _password:string){
        return this._data.auth.login( {email:_email, password:_password},this.getProvider('custom') );        
    }

    getCurrentUser(){
        return this._data.auth.getAuth().auth;
    }

    getProvider(from: string) {
        switch (from) {
          
            case 'custom': 
            return {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
                };

            case 'twitter': 
            return {
                provider: AuthProviders.Twitter,
                method: AuthMethods.Popup
                };
            case 'facebook': return {
                provider: AuthProviders.Facebook,
                method: AuthMethods.Popup
                };
            case 'github': return {
                provider: AuthProviders.Github,
                method: AuthMethods.Popup
                };
            case 'google': return {
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
                };
        }
    }    

    getFacultiesDetails(): Observable<FacultyDetails[]> {      
        return this.faculty_details = this._data.database.list('/faculty_details');
    } 
}