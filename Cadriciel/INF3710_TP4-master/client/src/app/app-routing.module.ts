import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { MemberDashboardComponent } from "./member-dashboard/member-dashboard.component";
import { MemberComponent } from "./member/member.component";
import { MovieComponent } from "./movie/movie.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},  
  { path: 'login', component: LoginComponent, data: { title: 'Login Page'}},   
  { path: 'admin-dashboard', component: AdminDashboardComponent},    
  { path: "member-dashboard", component: MemberDashboardComponent },
  { path: "admin-dashboard/member", component: MemberComponent },
  { path: "admin-dashboard/movie", component: MovieComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
