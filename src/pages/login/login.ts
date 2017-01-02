
import { Component } from '@angular/core';
import { NavController,MenuController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { Storage } from '@ionic/storage';

import { UserDetails} from '../../models/UserDetails';
import { FacultyDetails} from '../../models/FacultyDetails';

import { ValidatorService} from '../../services/ValidatorService';
import { ToastService} from '../../services/ToastService';
import { UserService} from '../../services/UserService';
import { FirebaseService} from '../../services/firebase.service';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AuthenticationService} from '../../services/authentication.service';

import { CurrentUserService } from '../../services/current.user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  templateUrl: 'login.html',
  providers: [ValidatorService,ToastService, UserService,AuthenticationService,
  CurrentUserService,StorageService,FirebaseService]
})

export class LoginPage {

  userDetails: UserDetails=new UserDetails();
  message: string = "gtf";
  counter:number=1;
  _token: any;
  faculty_details: FacultyDetails[];//FirebaseListObservable

  constructor(private _authService: AuthenticationService,private _data: AngularFire, private nav: NavController,storage: Storage,
    public menu: MenuController,public childEvaluationApi:FirebaseService,
    public validatorService:ValidatorService,public toastService:ToastService,public userService:UserService,
    private currentUserService: CurrentUserService)
  {  
    this.menu.enable(false);   
  }

  ionViewWillEnter() {
      console.log('started');
      

      //this.faculty_details = this._data.database.list('/faculty_details');
    /*  this.faculty_details.subscribe(queriedItems => {
        console.log(queriedItems);  
        console.log(queriedItems[0].facultyName);
      }); */ 
   } 

  moveToRegisterPage():void {
    console.log("Move to register page");
    this.nav.push(RegisterPage);
  }

  signIn():void {    
  
    if(!this.validatorService.validateEmail(this.userDetails.email)){
        this.toastService.presentToast("Invalid email");
    }
    else if(this.userDetails.password==undefined || this.userDetails.password.length<1){
        this.toastService.presentToast("Enter password");
    }     
    else{   
      this.signInWithUserIDPassword();
    
      /*this.userService.getDetailsForEmailID(this.userDetails.email,this.userDetails.password)
          .then((data) => {
            if(data==undefined){
               this.toastService.presentToast("Invalid email or password");
            }
            else{
               this.toastService.presentToast("Logged In "+data.userName);
               this.menu.enable(true);   
               this.nav.setRoot(HomePage);
            }               
            }, (error) => {
               this.toastService.presentToast("Error "+JSON.stringify(error));
            });     */ 
      }
  }

    getToken(): any {
        this._token = this._authService.getCustomToken();             
        return this._token;
    }

    signInWithUserIDPassword(): void {       
       try{
        this._authService.signInWithUserIDPassword(this.userDetails.email, this.userDetails.password)
            .then((result) => {
              console.log('Normal Sign');
                   this.toastService.presentToast("success");
                //this.toastService.presentToast(JSON.stringify(result));
                // this._token = result.uid;
                // this.currentUserService.token = this._token;
                // this._authService.setLoggedinUserDetails();
                // this._authService.isLoggedInSubject.next(this._authService.checkIsLoggedIn());
                this.menu.enable(true);   
                this.nav.setRoot(HomePage);
                //this.postSignIn();
            })
            .catch(error =>
            {
             // console.log(error);
               this.toastService.presentToast("error");
                this.toastService.presentToast(JSON.stringify(error));
               // this._spinnerService.hideLoader();
                //this.logger.logError(this._authService.getAuthErrorMessage(error));
                //this.errorMessage = this._authService.getAuthErrorMessage(error) ;
            }
            ); 
       }
       catch(ex){
          console.log("Exccc");
          console.log(ex);
       }
             
    }
 
  signInWithGoogle(): void {
      //  this._spinnerService.showLoader();
      //  event.preventDefault();       

        this._authService.signInWithGoogle()
            .then((result) => {
                this.toastService.presentToast("success");
                this.toastService.presentToast(JSON.stringify(result));
                console.log(result);
                this._token = result.uid;
                this.currentUserService.token = this._token;   
                this._authService.setLoggedinUserDetails();             
                this._authService.isLoggedInSubject.next(this._authService.checkIsLoggedIn());  
                 this.nav.setRoot(HomePage);              
               // this.postSignIn();
            })
            .catch(error => {
              this.toastService.presentToast("error");
              this.toastService.presentToast(JSON.stringify(error));
             //   this._spinnerService.hideLoader();
              //  this.logger.logError(error.message);
                //this.errorMessage = error.message;
            }
            );
  }



  
  writeDataToFirebase():void {   
      let faculties : Array<{facultyName: string, description: any}>;
      try{
        faculties=
          [
            {facultyName:"Courage",description:""},
            {facultyName:"Patriotism",description:""},
            {facultyName:"Kindness",description:""},
            {facultyName:"Politeness",description:""},
            {facultyName:"Responsibility",description:""},
            {facultyName:"Respectfulness",description:""}
         ];
      }
      catch(ex){
        this.toastService.presentToast("Creating "+JSON.stringify(ex));
      }     
      
      this.toastService.presentToast("Creating");

      for(let i=0;i<faculties.length;i++){
        this.faculty_details.push({
           facultyName:faculties[i].facultyName,
           description: faculties[i].description
      })
      }
      this.message = "Status : Started";  
     /* this.faculty_details.push({
           faculty_name:this.counter+"Mrinal",
           description: this.counter+"jhamrinal495@gmail.com"
      })*/
      this.counter++;    
  }

 login():void {
    this._data.auth.login();
  }   
}
