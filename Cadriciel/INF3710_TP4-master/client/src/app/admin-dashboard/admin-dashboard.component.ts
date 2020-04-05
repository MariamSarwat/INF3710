import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {}

  public createDB(): void {
    this.communicationService.setUpDatabase().subscribe((res: any) => {
        console.log(res);
    });
  }
}
