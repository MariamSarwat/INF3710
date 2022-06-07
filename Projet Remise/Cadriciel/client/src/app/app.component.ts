import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MemberService } from "./member-dashboard/member.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public route: string = '';

    public constructor(location: Location, router: Router, public memberService: MemberService) {
      router.events.subscribe(() => {
          if (location.path() !== "") {
            this.route = location.path();
          } else {
            this.route = "";
          }
      });
    }    
    
  public logout():void{
    this.memberService.memberInfo = {"id_membre": 0, "adr_courriel": '', "mot_de_passe": '', "nom_rue": '', 
    "no_appart": 0, "no_rue": 0, "code_postal": '', "ville": '', "province": '', "pays": '',"nom": ''};
    this.memberService.isAdmin = false;
  }
}