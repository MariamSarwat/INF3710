import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member-dashboard/member.service';
import { Member } from '../../../../common/Member';
import { CreditCard } from '../../../../common/CreditCard';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  public valUser: FormGroup;
  public errorNotLoggedIn: boolean;

  constructor(private communicationService: CommunicationService, private memberService: MemberService, private router: Router) { 
    this.loggedInMember = this.memberService.memberInfo;
    this.valUser = new FormGroup({
      "titulaire": new FormControl( "", Validators.compose([Validators.required, Validators.maxLength(100)])),
      "numero": new FormControl("", Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("^[0-9]+$")])),
      "ccv": new FormControl("", Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern("^[0-9]+$")])),
      "date_expiration": new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^\\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$")]))
    });
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
        for (let cc of this.creditCards)
          cc.date_expiration = cc.date_expiration.split('T')[0];
    });
  }

  public submit(): void {
    if(this.loggedInMember.id_membre !== 0){
      this.errorNotLoggedIn = false;
      const cc: CreditCard = {
        "id_membre":this.loggedInMember.id_membre,
        "ccv": this.valUser.value.ccv,
        "titulaire": this.valUser.value.titulaire,
        "numero": this.valUser.value.numero,
        "date_expiration": this.valUser.value.date_expiration
      };
      this.communicationService.insertCC(cc).subscribe(() => {
        this.getInformation();
        this.newCreditCard = false;
        this.valUser.reset();
      });
    } else {
      this.errorNotLoggedIn = true;
    }
  }
}
