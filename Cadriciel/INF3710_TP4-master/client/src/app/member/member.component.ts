import { Component } from "@angular/core";
import { Member } from "../../../../common/tables/Member";
import { CommunicationService } from "../communication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent {
  public members: Member[] = [];
  public duplicateError: boolean = false; // Un membre doit être unique, on ne veut pas que sont ID soit dupliqué
  public newMember: boolean;

  public constructor(private communicationService: CommunicationService, private router: Router) { }
 
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
        if (res > 0) this.communicationService.filter("update"); // see what "filter" does
        this.duplicateError = (res === -1);
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
