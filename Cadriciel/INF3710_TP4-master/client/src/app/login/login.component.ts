import { Component, OnInit } from '@angular/core';
//import {MatDialog} from '@angular/material'
import { Login } from "../../../../common/tables/Login";
import { CommunicationService } from '../communication.service';
import { Member } from '../../../../common/tables/Member';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginInfo : Login ; 
  public members : Member[] = [];   
  public errorMessage: string; 
  
  constructor(private communicationService: CommunicationService, private router: Router) { 
    this.communicationService.getMembers().subscribe((members: Member[]) => {
      this.members = members;
    });
  }    
    
  ngOnInit() {      
    this.loginInfo = {username: '', password: ''};
    sessionStorage.clear();    
  }  

  login(){
    this.communicationService.Login(this.loginInfo).subscribe((members: Member[]) => {
      this.members = members;
    }); 
    
    if(this.members.length === 1){
      this.router.navigate(['/dashboard']);    
    } else{
      this.errorMessage = 'no user was found';    
    }    
    console.log(this.members);
    console.log(this.loginInfo);
  }

}
