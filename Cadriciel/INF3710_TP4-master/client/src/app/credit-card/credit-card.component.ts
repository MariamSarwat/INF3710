import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member-dashboard/member.service';
import { Member } from '../../../../common/tables/Member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  public loggedInMember: Member;
  public newCreditCard: boolean;

  constructor(private memberService: MemberService, private router: Router) { 
    this.loggedInMember = this.memberService.memberInfo;
  }

  ngOnInit(): void { }

  public goToDashboard(): void {
    this.router.navigateByUrl('/member-dashboard');
  }

  public cancel(): void {
    this.newCreditCard = false;
  }

}
