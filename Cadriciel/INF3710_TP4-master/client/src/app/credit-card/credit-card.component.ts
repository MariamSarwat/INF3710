import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member-dashboard/member.service';
import { Member } from '../../../../common/tables/Member';
import { CreditCard } from '../../../../common/tables/CreditCard';

import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  public loggedInMember: Member;
  public newCreditCard: boolean;
  public creditCards: CreditCard[] = [];

  constructor(private communicationService: CommunicationService, private memberService: MemberService, private router: Router) { 
    this.loggedInMember = this.memberService.memberInfo;
  }

  ngOnInit(): void { 
    this.getInformation();
  }

  public goToDashboard(): void {
    this.router.navigateByUrl('/member-dashboard');
  }

  public cancel(): void {
    this.newCreditCard = false;
  }

  public getInformation(): void {
    this.communicationService.getMembershipInfo(this.loggedInMember.id_membre).subscribe((info: CreditCard[]) => {
        this.creditCards = info;
    });
  }
}
