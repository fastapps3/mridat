
export class UserDetails 
{
  ID:number;
  userName: string="Mrinal";
  password : string="abcdef";
  confirmPassword: string="abcdef";
  gender: number=1;
  email: string="jhamrinal495@gmail.com";
  isLoggedIn:number=0;

  constructor()
  {
  }

  public setDataToUserDetails(userName:string,password : string,  gender: number,  email: string, isLoggedIn:number):UserDetails
  {
      this.userName=userName;
      this.password=password;
      this.gender=gender;
      this.email = email;
      this.isLoggedIn=isLoggedIn;
      return this;
  }  
}

export class PageVisibilityStatus{
  showOnLogin: number = 1;
  hideOnLogin: number = 2;
  logoutBtn:number = 3;
  showAllPage:number =4;
}