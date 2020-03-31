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
  public loginInfo : Login = {username: '', password: ''};
  public members : Member[] = [];   
  public errorMessage: string; 
  
  constructor(private communicationService: CommunicationService, private router: Router) { }    

  login(){
    this.communicationService.Login(this.loginInfo).subscribe((members: Member[]) => {
      this.members = members;
      if(this.members.length === 1){
        this.router.navigate(['/dashboard']);    
      } else{
        this.errorMessage = 'no user was found';    
      }    
      console.log(this.members);
      console.log(this.loginInfo);
    }); 
  }
}
