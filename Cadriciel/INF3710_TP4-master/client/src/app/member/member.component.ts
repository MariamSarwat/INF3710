import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Member } from "../../../../common/tables/Member";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent {
  public members: Member[] = [];
  public newMember: boolean;
  public validatingInputFromUser: FormGroup;

  public constructor(private communicationService: CommunicationService, private router: Router) { 
    this.validatingInputFromUser = new FormGroup({

      "adr_courriel": new FormControl( "", Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)])),
      "mot_de_passe": new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)])),
      "nom_rue": new FormControl("", Validators.compose([Validators.required,
                                                         Validators.pattern("^[a-zA-Z \-\']+$"), Validators.maxLength(30)])),
      "no_appart": new FormControl("", Validators.compose([Validators.pattern("^[0-9]+$"), Validators.maxLength(5)])),
      "no_rue": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(5)])),
      "code_postal": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]+$"),
                                                             Validators.maxLength(6)])),
      "ville": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z \-\']+$"),
                                                       Validators.maxLength(20)])),
      "province": new FormControl("", Validators.compose([Validators.pattern("^[a-zA-Z \-\']+$"), Validators.maxLength(20)])),
      "pays": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z \-\']+$"),
                                                      Validators.maxLength(30)])),
      "nom": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z \-\']+$"),
                                                     Validators.maxLength(100)]))
    });
  }
 
  ngOnInit(){
    this.getMembers();
  }

  public insertMember(): void {
    const member: Member = {
      "id_membre": this.members.length + 1,
      "adr_courriel": this.validatingInputFromUser.value.adr_courriel,
      "mot_de_passe": this.validatingInputFromUser.value.mot_de_passe,
      "nom_rue": this.validatingInputFromUser.value.nom_rue,
      "no_appart": this.validatingInputFromUser.value.no_appart,
      "no_rue": this.validatingInputFromUser.value.no_rue,
      "code_postal": this.validatingInputFromUser.value.code_postal,
      "ville": this.validatingInputFromUser.value.ville,
      "province": this.validatingInputFromUser.value.province,
      "pays": this.validatingInputFromUser.value.pays,
      "nom": this.validatingInputFromUser.value.nom
    };
    this.communicationService.insertMember(member).subscribe((res: number) => {
        this.getMembers();
        this.newMember = false;
        this.validatingInputFromUser.reset()
    });
  }

  public getMembers(): void {
    this.communicationService.getMembers().subscribe((members: Member[]) => {
        this.members = members;
    });
  }

  public goToDashboard(): void {
    this.router.navigateByUrl('/admin-dashboard');
  }

  public cancel(): void {
    this.newMember = false;
  }
}
