
import { NgModule } from '@angular/core';//ErrorHandler
import { IonicApp ,IonicModule} from 'ionic-angular';//, IonicModule, IonicErrorHandler
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

export const firebaseConfig = {
    apiKey: "AIzaSyCGMaJar3cDMEn82HnIQwF8AyUBa8XDl5M",
    authDomain: "childnatureevaluation.firebaseapp.com",
    databaseURL: "https://childnatureevaluation.firebaseio.com",
    storageBucket: "childnatureevaluation.appspot.com",
    messagingSenderId: "78656440069"
}
//clientID:"78656440069-94r817sg69bfppc5elp2hp9nq162j8dl.apps.googleusercontent.com"
//clientSecret:TLtVA1yD5n1gp3-awAqIsAOU
/*const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}*/

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage,
    RegisterPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage,
    RegisterPage,
    LoginPage
  ],
  providers: [Storage]//{provide: ErrorHandler, useClass: IonicErrorHandler}
})
export class AppModule {}
