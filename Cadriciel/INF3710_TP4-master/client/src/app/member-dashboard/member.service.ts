import { Injectable } from '@angular/core';
import { Member } from '../../../../common/tables/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public memberInfo: Member = {"id_membre": 0, "adr_courriel": '', "mot_de_passe": '', "nom_rue": '', 
  "no_appart": 0, "no_rue": 0, "code_postal": '', "ville": '', "province": '', "pays": '',"nom": ''};
}
