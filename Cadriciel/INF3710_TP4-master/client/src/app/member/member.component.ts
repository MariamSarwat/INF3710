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
  public duplicateError: boolean = false; // Un membre doit être unique, on ne veut pas que sont ID soit dupliqué
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
      "code_postal": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$"),
                                                             Validators.maxLength(6)])), // à modifier
      "ville": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z \-\']+$"),
                                                       Validators.maxLength(20)])),
      "province": new FormControl("", Validators.compose([Validators.pattern("^[a-zA-Z \-\']+$"), Validators.maxLength(20)])),
      "pays": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z \-\']+$"), Validators.maxLength(30)])),
      "nom": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z \-\']+$"), Validators.maxLength(100)]))
    });
  }
 
  ngOnInit(){
    this.getMembers();
  }

  // Comment on distingue les champs qui peuvent être null? Et ceux qui sont obligatoires
  public insertMember(email: string, password: string, streetName: string, apartmentNo: number, streetNo: number,
                      zipCode: string, city: string, province: string, country: string, memberName: string): void {
    const member: Member = {
      "id_membre": this.members.length + 1,
      "adr_courriel": email,
      "mot_de_passe": password,
      "nom_rue": streetName,
      "no_appart": apartmentNo,
      "no_rue": streetNo,
      "code_postal": zipCode,
      "ville": city,
      "province": province,
      "pays": country,
      "nom": memberName
    };
    this.communicationService.insertMember(member).subscribe((res: number) => {
        //if (res > 0) this.communicationService.filter("update"); // see what "filter" does
        //this.duplicateError = (res === -1);
        this.getMembers();
        this.newMember = false;
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
