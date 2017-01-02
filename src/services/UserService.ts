
import {Injectable} from '@angular/core';
import { SQLite } from 'ionic-native';
import { Storage } from '@ionic/storage';
//const win: any = window;

import {Platform} from 'ionic-angular';
import {UserDetails} from '../models/UserDetails';

import { ToastController} from 'ionic-angular';

@Injectable()
export class UserService {
    
    public db: SQLite;
    
    constructor(private storage:Storage,public toastCtrl: ToastController){
      // if (win.sqlitePlugin) {
           // this.sql = new SqlStorageService();
          //  this.presentToast("Db opened");
        //} else {
        //    console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
        //}
    }

    initStorage():Promise<boolean>{
        this.db = new SQLite();
        return this.db.openDatabase({ name: 'data.db', location: 'default' })
        .then((db) => {
          //  this.presentToast("Db opened");    
            return true;         
        });
    }

   presentToast(message:string):void {
        let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
        });
        toast.present();
    }

  /*  public deleteAll():Promise<boolean>{
        return this.db.executeSql("DELETE FROM UserDetails",[])
            .then((data) => {
                console.log("DELETED");
                return true;
            }, (error) => {
                console.log("ERROR");
                return false;
            }); 
    }*/

    createAUserRecord(userDetails: UserDetails):Promise<boolean> {
       let query = 'INSERT INTO userdetails (username, password,gender,email,isloggedin) VALUES(?,?,?,?,?)';  
       this.db = new SQLite();
       return this.db.openDatabase({ name: 'data.db', location: 'default' })
             .then((db) => {
                    return this.db.executeSql(query, [
                            userDetails.userName,
                            userDetails.password,
                            userDetails.gender,
                            userDetails.email,
                            userDetails.isLoggedIn
                        ])
                        .then((data) => {    
                                this.presentToast("INSERTED: " + JSON.stringify(data));          
                                return true;
                            }, (error) => {
                                this.presentToast("ERROR: " + JSON.stringify(error));
                                return false;
                    }); 
        });
    }
 


    public getDetailsForEmailID(email:string,password:string):Promise<UserDetails>{
       let currentUser:UserDetails;
      // this.presentToast("Filter "+email+" Pass "+password+" database "+this.db);
       this.db = new SQLite();
      // where email="+email+" and password="+password 
       return this.db.openDatabase({ name: 'data.db', location: 'default' })
             .then((db) => {
                    return this.db.executeSql(
                    "SELECT ID , username , password ,email ,gender ,isloggedin FROM userdetails  where email=? and password=?", 
                    [email,password])
                            .then((data) => {
                        //this.presentToast("data "+JSON.stringify(data.rows.item(0)));                        
                        if(data!=undefined && data.rows != undefined){
                             //this.presentToast("data "+JSON.stringify(data.rows));
                             if(data.rows.length > 0) {
                                    for(var i = 0; i < data.rows.length; i++) {
                                        currentUser =  new UserDetails().setDataToUserDetails(
                                                        data.rows.item(i).username,data.rows.item(i).password,
                                                        data.rows.item(i).gender, data.rows.item(i).email,
                                                        data.rows.item(i).isloggedin)  ;
                                    }
                                }
                             //this.presentToast("Data length "+data.rows.length);
                        }
                        else{
                                this.presentToast("No Data Available");
                        }            
                            return currentUser;
                        }, (error) => {
                            this.presentToast("ERROR: " + JSON.stringify(error));
                            return currentUser;
                        });
        });
        
    }

    public createUserDetailsTable():Promise<boolean>
    {     
        this.db = new SQLite();
        return this.db.openDatabase({ name: 'data.db', location: 'default' })
             .then((db) => {
             return this.db.executeSql("CREATE TABLE IF NOT EXISTS userdetails"
                    +" (ID INTEGER PRIMARY KEY AUTOINCREMENT, username CHAR(50), password TEXT,email CHAR(50)"+
                    ",gender INTEGER,isloggedin INTEGER)", {}).then((data) => {
                        this.presentToast("TABLE CREATED: "+ data);
                        return true;
                    }, (error) => {
                        this.presentToast("Unable to execute sql"+ JSON.stringify(error));
                        return false;
             });
        });       
    }
}