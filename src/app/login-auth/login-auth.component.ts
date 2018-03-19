import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {

  @ViewChild('openLoginModal') button:ElementRef;

  constructor(public auth: AuthService) {} //Reference to modal button to trigger modal automically

  ngOnInit() {
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated()){
      console.log("User is logged in!");
    }
    else{
      this.button.nativeElement.click();
      console.log("Trigger Login Modal");
    }
  }
}
