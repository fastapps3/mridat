
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserDetails } from '../../models/UserDetails';
import { GenderEnum } from '../../models/GenderEnum';

import { ValidatorService} from '../../services/ValidatorService';
import { ToastService} from '../../services/ToastService';
import { UserService} from '../../services/UserService';
import { AuthenticationService} from '../../services/authentication.service';
import { CurrentUserService } from '../../services/current.user.service';
import { StorageService } from '../../services/storage.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  templateUrl: 'register.html',
  providers: [ValidatorService,ToastService,UserService,AuthenticationService,
  CurrentUserService,StorageService,FirebaseService]
})
export class RegisterPage {

  public userDetails: UserDetails =  new UserDetails();
  public genderEnum: GenderEnum =  new GenderEnum();
  
  constructor(public validatorService:ValidatorService,
  public toastService:ToastService,public userService:UserService,
  private nav: NavController,private _authService: AuthenticationService) {

  }

  ionViewWillEnter() {       
 
   } 

  register():void{
   // console.log(this.userDetails);
    if(!this.validatorService.validateEmail(this.userDetails.email)){
      this.toastService.presentToast("Invalid email");
    }
    else if(this.userDetails.password==undefined || this.userDetails.password.length<1){
      this.toastService.presentToast("Enter password");
    }  
    else if(this.userDetails.confirmPassword==undefined || this.userDetails.confirmPassword.length<1){
      this.toastService.presentToast("confirm password");
    }     
    else if(this.userDetails.confirmPassword != this.userDetails.password){     
       this.toastService.presentToast("Password and Confirm password don't match");
    }
    else{
      // this.toastService.presentToast("Creating your account");
     /*  this.userService.createAUserRecord(this.userDetails)
       .then((data) => {
                if(data==true){
                 // this.toastService.presentToast("Record created successfully");
                  this.nav.pop();
                }
                else{
                  this.toastService.presentToast("Error creating record "+data);  
                }        
            }, (error) => {                
                this.toastService.presentToast("Error creating record");
            });  */
          this.signUp().then(
            ()=>{
              console.log("done");
            },
            (error)=>{
               console.log(error);
            }
          );
    }
  }

   signUp(): Promise<any> {
       console.log(this.userDetails);
       try{
return this._authService.registerUser(this.userDetails.email, this.userDetails.password)
            .then(() => { 
               // this.isLoginBox = true;
                this.nav.pop();
        })      
        .catch(function (error) {
            console.log(error);
            // Handle Errors here.
          //  var errorCode = error.code;
            var errorMessage = error.message;
            this.logger.logError(errorMessage);
            
        });
       }
      catch(error){
        console.log("Errorrrrrr");
        console.log(error);
      }
    }


}
