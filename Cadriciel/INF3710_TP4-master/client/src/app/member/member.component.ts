import { Component } from "@angular/core";
import { Member } from "../../../../common/tables/Member";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent {

  public constructor(private communicationService: CommunicationService) { }

  // do we need "ngOnInit()"?
  public duplicateError: boolean = false; // Un membre doit être unique, on ne veut pas que sont ID soit dupliqué
  // Comment on distingue les champs qui peuvent être null? Et ceux qui sont obligatoires
  public insertMember(memberID: number, email: string, password: string, streetName: string, apartmentNo: number, streetNo: number,
                      zipCode: string, city: string, province: string, country: string, memberName: string): void {
    const member: Member = {
      memberID: memberID,
      email: email,
      password: password,
      streetName: streetName,
      apartmentNo: apartmentNo,
      streetNo: streetNo,
      zipCode: zipCode,
      city: city,
      province: province,
      country: country,
      memberName: memberName
    };
    this.communicationService.insertMember(member).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update"); // see what "filter" does
        }
        this.duplicateError = (res === -1);
    });
  }
}
