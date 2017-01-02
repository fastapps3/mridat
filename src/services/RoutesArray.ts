
import {Injectable} from '@angular/core';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PageVisibilityStatus} from '../models/UserDetails';

@Injectable()
export class RoutesArray
{
    pages: Array<{title: string, component: any,isHiddenOnLogin:number,isVisible:boolean}>;
    pageVisibilityStatus: PageVisibilityStatus = new PageVisibilityStatus();
    rootPage: any = LoginPage; 
    constructor(){
         this.pages =
          [
                { title: 'Home', component: HomePage,isVisible:true,isHiddenOnLogin:this.pageVisibilityStatus.showAllPage }
              //  { title: 'Login', component: LoginPage,isVisible:false ,isHiddenOnLogin:this.pageVisibilityStatus.hideOnLogin},
             //   { title: 'Register', component: RegisterPage,isVisible:false,isHiddenOnLogin:this.pageVisibilityStatus.hideOnLogin }  ,   
              //  { title: 'Logout', component: LoginPage,isVisible:true,isHiddenOnLogin:this.pageVisibilityStatus.logoutBtn }
          ];
    }
   
    setRoutesForBasedOnLogin(isLoggedIn:boolean):void{
        if(isLoggedIn){
            for (let page of this.pages) {
                if(page.isHiddenOnLogin==this.pageVisibilityStatus.hideOnLogin)
                    page.isVisible=false;
                else
                    page.isVisible=true;
            }
        }
        else{
            for (let page of this.pages) {
                 if(page.isHiddenOnLogin==this.pageVisibilityStatus.showOnLogin ||
                 page.isHiddenOnLogin==this.pageVisibilityStatus.logoutBtn)
                    page.isVisible=false;
                else
                    page.isVisible=true;
            }
        }
        console.log(this.pages);
    }

}