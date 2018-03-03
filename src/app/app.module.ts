import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { UserService } from './user/user.service';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { GoogleMapComponent } from './home/google-map/google-map.component';
import { SearchBarComponent } from './home/search/search-bar/search-bar.component';
import { DropdownComponent } from './home/search/dropdown/dropdown.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    GoogleMapComponent,
    SearchBarComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
