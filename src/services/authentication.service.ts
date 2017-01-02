import {firebase} from 'firebase/auth';
import { Injectable} from "@angular/core";
import { BehaviorSubject} from 'rxjs/BehaviorSubject'
import { CurrentUserService } from './current.user.service';
import { FirebaseService } from './firebase.service';
import { FirebaseUser } from '../models/firebase.user';

@Injectable()
export class AuthenticationService {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;
 public isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private _currentUserService: CurrentUserService,
  private _firebaseService: FirebaseService) {
   
 /*   this.fireAuth = firebase.auth();
    this.userProfile = firebase.auth().currentUser;*/
  }

    get loggedInObservable() {
        return this.isLoggedInSubject.asObservable();
    }   

    public checkIsLoggedIn() {
       let isLoggedIn = false;
       try {
           if (this._currentUserService.token) {
               isLoggedIn = true;
           }
       } catch (e) {

       }
      return isLoggedIn;
    }   

    get isAauthenticated(): boolean {
        let isLoggedIn = false;
        this._firebaseService.fireAuth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                isLoggedIn = true;
            } else {
                // No user is signed in.
                isLoggedIn = false;
            }
        });
        return isLoggedIn;
    }

    registerUser(_email: string, _password: string) {
      // return this._firebaseService.fireAuth.createUser
       return this._firebaseService.createUserWithEmailAndPassword(_email, _password);

    }

    customSignIn(_email: string, _password: string) {
        return this._firebaseService.signInWithEmailAndPassword(_email, _password);            
    }

   anonymousSignIn(): Promise<any> {
        return this._firebaseService.fireAuth.signInAnonymously()
            .then(function (result) {
                console.log('Logged in as Anonymous!');
                result.getToken().then(function (token) {
                    this._currentUserService.token = token;
                });
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (error) {
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            console.log("The specified user account email is invalid.");
                            break;
                        case "INVALID_PASSWORD":
                            console.log("The specified user account password is incorrect.");
                            break;
                        case "INVALID_USER":
                            console.log("The specified user account does not exist.");
                            break;
                        default:
                            console.log("Error logging user in:", error);
                    }
                }
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    signInWithUserIDPassword(_email: string, _password: string) {
        return this.customSignIn(_email, _password);
    }

    getCustomToken(): any {
        var uid = this._firebaseService.fireAuth.currentUser.uid;
        return uid;
        //return this._firebaseService.auth.currentUser.createCustomToken(uid);        
        //return this._firebaseService.auth.currentUser.getToken( true);
    }

    signInWithAnonymous(): Promise<any> {
        return this.anonymousSignIn();
    }

    signInWithGoogle(){        
        return this._firebaseService.signInWithGoogle();//fireAuth.signInWithPopup(this._firebaseService.getProvider('google'));
    }

    signInWithFacebook(): Promise<any> {
        return this._firebaseService.fireAuth.signInWithPopup(this._firebaseService.getProvider('facebook'));            
    }

    signInWithTwitter(): Promise<any> {
        return this._firebaseService.fireAuth.signInWithPopup(this._firebaseService.getProvider('twitter'));
    }

    signInWithGithub(): Promise<any> {
        return this._firebaseService.fireAuth.signInWithPopup(this._firebaseService.getProvider('github'));            
    }

    public signOut(): void {
        this._firebaseService.fireAuth.signOut();
        //return new Promise(function (resolve, reject) {
        //    // async stuff, like fetching users from server, returning a response
        //    this._firebaseService.auth.signOut().then(function () {               
        //        console.log('Signout Succesfull')
        //        resolve(true);
        //    }, function (error) {
        //        console.log('Signout Failed');
        //        reject(false);
        //    });            
        //});                 
    }


   public setLoggedinUserDetails(): void {
        let user = this._firebaseService.getCurrentUser();
        console.log(user);
        let fbUser = new FirebaseUser(); 
        if (user != null) {
            user.providerData.forEach(function (profile) {
                fbUser.Name = profile.displayName;
                fbUser.Email = profile.email;
                fbUser.PhotoUrl = profile.photoURL;
                fbUser.UId = user.uid;
                fbUser.SignInProvider = profile.providerId;
                fbUser.ProviderSpecificUID = profile.uid;
                console.log("Sign-in provider: " + profile.providerId);
                console.log("UID: " + user.uid);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });
        }
        this._currentUserService.setLoggedInUser = fbUser;
    }

     public getAuthErrorMessage(error: any): string {
        let errorMessage: string = ''
        switch (error.code) {
            case "INVALID_EMAIL":
                errorMessage = "The specified user account email is invalid.";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The specified user account password is incorrect.";
                break;
            case "INVALID_USER":
                errorMessage = "The specified user account does not exist.";
                break;
            default:
                errorMessage =  error;
        }
        return errorMessage;
    }

    resetPassword(): Promise<any> {
        var user = this._firebaseService.fireAuth.currentUser;
        var newPassword = this.getASecureRandomPassword();
        return user.updatePassword(newPassword);
    }

    sendResetEmail(emailAddress: string): Promise<any> {
        var auth = this._firebaseService.fireAuth;       
        return auth.sendPasswordResetEmail(emailAddress);
    }

    getASecureRandomPassword(): string{
        let text: string = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}