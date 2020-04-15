import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { MemberComponent } from "./member/member.component";
import { LoginComponent } from './login/login.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    LoginComponent,
    AdminDashboardComponent,
    MemberDashboardComponent,
    MovieComponent,
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
