import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Member } from "../../../../common/tables/Member";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent implements OnInit {
  public route: string;
  public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() !== "") {
        this.route = location.path();
      } else {
        this.route = "";
      }
    });
   }
  public members: Member[] = [];
  public duplicateError: boolean = false; // Un membre doit être unique, on ne veut pas que sont ID soit dupliqué
  public ngOnInit(): void {
    this.communicationService.listen().subscribe((m:any) => {
        console.log(m);
        this.getMembers();
    });
  }

  // Comment on distingue les champs qui peuvent être null? Et ceux qui sont obligatoires
  public insertMember(memberID: number, email: string, password: string, streetName: string, apartmentNo: number, streetNo: number,
                      zipCode: string, city: string, province: string, country: string, memberName: string): void {
    const member: Member = {
      "memberID": memberID,
      "email": email,
      "password": password,
      "streetName": streetName,
      "apartmentNo": apartmentNo,
      "streetNo": streetNo,
      "zipCode": zipCode,
      "city": city,
      "province": province,
      "country": country,
      "memberName": memberName
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
