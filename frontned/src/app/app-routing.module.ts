import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { CreateComponent } from './component/create/create.component';
import { SavedComponent } from './component/saved/saved.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthRedirectGuard } from './auth-redirect.guard';
import { PostdetailsComponent } from './component/postdetails/postdetails.component';
import { ProfileDetailsComponent } from './component/profile-details/profile-details.component';


const routes: Routes = [
  {path:'login', component:LoginComponent,canActivate: [AuthRedirectGuard]},
  {path:'signup', component:SignupComponent,canActivate: [AuthRedirectGuard]},
  {path:'create' , component:CreateComponent ,canActivate: [AuthGuard]},
  {path:'saved' , component:SavedComponent,canActivate: [AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'home',component:HomeComponent , canActivate: [AuthGuard]},
  {path:'postdata/:id',component:PostdetailsComponent , canActivate: [AuthGuard]},
  {path:'profile/:id', component:ProfileDetailsComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
