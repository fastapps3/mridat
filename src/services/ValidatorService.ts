
import {Injectable} from '@angular/core';

@Injectable()
export class ValidatorService{

 validateEmail(email:string):boolean{
    let emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailregex.test(email) ;    
  }
}