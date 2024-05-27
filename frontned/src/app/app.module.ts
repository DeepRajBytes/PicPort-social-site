import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './component/home/home.component';
import { SavedComponent } from './component/saved/saved.component';
import { CreateComponent } from './component/create/create.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PostdetailsComponent } from './component/postdetails/postdetails.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileDetailsComponent } from './component/profile-details/profile-details.component';
import {MatDividerModule} from '@angular/material/divider';
import { ProfileEditorComponent } from './component/profile-editor/profile-editor.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    SavedComponent,
    CreateComponent,
    ProfileComponent,
    FooterComponent,
    PostdetailsComponent,
    ProfileDetailsComponent,
    ProfileEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
