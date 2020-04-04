import { Component } from '@angular/core';
import { Login } from "../../../../common/tables/Login";
import { CommunicationService } from '../communication.service';
import { Member } from '../../../../common/tables/Member';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  public loginInfo : Login = {username: '', password: '', loginType: "member"};
  public member : Member[] = [];   
  public errorMessage: string; 
  
  constructor(private communicationService: CommunicationService, private router: Router) {}    

  login(): void{
    this.communicationService.Login(this.loginInfo).subscribe((member: Member[]) => {
      this.member = member;
      if(this.member.length === 1){
        this.navigateTo();    
      } else {
        this.errorMessage = 'no user was found';    
      }    
      console.log(this.member);
      console.log(this.loginInfo);
    }); 
  }

  navigateTo(): void {
    console.log(this.loginInfo.loginType);
    if(this.loginInfo.loginType === "admin"){
      this.router.navigate(['/dashboard']);    
    } else if(this.loginInfo.loginType === "member"){
      this.router.navigate(['/member']);    
    }
  }
}
