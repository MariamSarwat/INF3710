import { Component } from '@angular/core';
import { Login } from "../../../../common/Login";
import { CommunicationService } from '../communication.service';
import { Member } from '../../../../common/Member';
import { Router } from "@angular/router";
import { MemberService } from '../member-dashboard/member.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  public loginInfo : Login = {username: '', password: '', loginType: "member"};
  public member : Member[] = [];   
  public errorMessage: string; 

  constructor(private communicationService: CommunicationService, private router: Router, private memberService: MemberService) {
    if (window.sessionStorage.getItem("databaseCreated") === null ) {
      this.communicationService.setUpDatabase().subscribe((res: any) => {
        sessionStorage.setItem("databaseCreated", 'true');
      });
    }
  }    

  public login(): void{
    this.communicationService.Login(this.loginInfo).subscribe((member: Member[]) => {
      this.member = member;
      if(this.member.length === 1){
        this.navigateTo(this.member[0]);    
      } else {
        this.errorMessage = 'no user was found';    
      }    
    }); 
  }

  public navigateTo(memberInfo: Member): void {
    if(this.loginInfo.loginType === "admin"){
      this.memberService.isAdmin = true;
      this.router.navigateByUrl('/admin-dashboard');    
    } else if(this.loginInfo.loginType === "member"){
      this.memberService.isAdmin = false;
      this.memberService.memberInfo = memberInfo;
      this.router.navigateByUrl('/member-dashboard');    
    }
  }
}
