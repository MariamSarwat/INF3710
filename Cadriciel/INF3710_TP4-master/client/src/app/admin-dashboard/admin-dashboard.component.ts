import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member-dashboard/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public memberService: MemberService, private router: Router) { }

  ngOnInit(): void {}
  
  public gotToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
