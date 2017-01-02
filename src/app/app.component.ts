import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

//import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { LoginPage } from '../pages/login/login';
//import { RegisterPage } from '../pages/register/register';
//import {PageVisibilityStatus} from '../models/UserDetails';
import {RoutesArray} from '../services/RoutesArray';
import {UserService} from '../services/UserService';

@Component({
  selector: 'app',
  templateUrl: 'app.html',
  providers:[RoutesArray,UserService]  
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any ;
  pages: Array<{title: string, component: any,isHiddenOnLogin:number}> ;

  constructor( public platform: Platform, public menu: MenuController,
  public routesArray: RoutesArray,public userService:UserService) 
  {
    this.initializeApp();   
    this.pages = routesArray.pages;     
  }

  initializeApp() {
    this.platform.ready().then(() => {    
      StatusBar.styleDefault();
      //console.log(this.pages);    
     // this.rootPage = this.routesArray.rootPage;   

      this.userService.initStorage().then(() => {

        this.userService.createUserDetailsTable().then(() => {
          this.rootPage = this.routesArray.rootPage; 
          Splashscreen.hide();
        });    

      });

    });
  }

  openPage(page) {   
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}
