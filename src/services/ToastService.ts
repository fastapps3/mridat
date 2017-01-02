
import {Injectable} from '@angular/core';
import { NavController ,ToastController} from 'ionic-angular';

@Injectable()
export class ToastService{
    constructor( public toastCtrl: ToastController){

    }

   public presentToast(message:string):void {
        let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
        });
        toast.present();
   }
}