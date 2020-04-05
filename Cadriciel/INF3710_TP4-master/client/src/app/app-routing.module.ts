import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HotelComponent } from "./hotel/hotel.component";
import { RoomComponent } from "./room/room.component";

import { LoginComponent } from "./login/login.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { MemberDashboardComponent } from "./member-dashboard/member-dashboard.component";
import { MemberComponent } from "./member/member.component";
import { MovieComponent } from "./movie/movie.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},  
  { path: 'login', component: LoginComponent, data: { title: 'Login Page'}},   
  { path: 'admin-dashboard', component: AdminDashboardComponent},    
  { path: "app", component: AppComponent },
  { path: "room", component: RoomComponent },
  { path: "hotel", component: HotelComponent },
  { path: "member-dashboard", component: MemberDashboardComponent },
  { path: "member", component: MemberComponent },
  { path: "movie", component: MovieComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
