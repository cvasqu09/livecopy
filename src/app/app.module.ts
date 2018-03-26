import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { UserService } from './user/user.service';
import { HomeComponent } from './home/home.component';
import { GoogleMapComponent } from './home/google-map/google-map.component';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { DropdownComponent } from './home/dropdown/dropdown.component';
import { appRoutes } from './frontend.routing';
import { ProfileComponent } from './profile/profile.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { TestMessageServiceComponent } from './test-message-service/test-message-service.component';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error/error.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoogleMapComponent,
    SearchBarComponent,
    DropdownComponent,
    ProfileComponent,
    EventDetailsComponent,
    TestMessageServiceComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    appRoutes
  ],

  providers: [
    UserService,
    AuthService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
