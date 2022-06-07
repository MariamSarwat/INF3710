import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { MemberComponent } from "./member/member.component";
import { LoginComponent } from './login/login.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MovieComponent } from './movie/movie.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    LoginComponent,
    AdminDashboardComponent,
    MemberDashboardComponent,
    MovieComponent,
    VideoPlayerComponent,
    CreditCardComponent,
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
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
  entryComponents : [MemberDashboardComponent],
})

export class AppModule { }
