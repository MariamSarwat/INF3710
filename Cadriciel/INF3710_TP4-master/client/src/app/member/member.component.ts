import { Component } from "@angular/core";
import { Member } from "../../../../common/tables/Member";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent {
  public route: string;
  public members: Member[] = [];
  public duplicateError: boolean = false; // Un membre doit être unique, on ne veut pas que sont ID soit dupliqué
  
  public constructor(private communicationService: CommunicationService) { }
 
  // Comment on distingue les champs qui peuvent être null? Et ceux qui sont obligatoires
  public insertMember(memberID: number, email: string, password: string, streetName: string, apartmentNo: number, streetNo: number,
                      zipCode: string, city: string, province: string, country: string, memberName: string): void {
    const member: Member = {
      "id_membre": memberID,
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
        if (res > 0) {
            this.communicationService.filter("update"); // see what "filter" does
        }
        this.duplicateError = (res === -1);
    });
  }

  public getMembers(): void {
    this.communicationService.getMembers().subscribe((members: Member[]) => {
        this.members = members;
    });
  }
}
