import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { HotelComponent } from "./hotel/hotel.component";
import { MemberComponent } from "./member/member.component";
import { RoomComponent } from "./room/room.component";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HotelComponent,
    MemberComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})

export class AppModule { }
