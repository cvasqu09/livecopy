import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {

  @ViewChild('openLoginModal') button:ElementRef;

  constructor(public auth: AuthService, private userService: UserService) {} //Reference to modal button to trigger modal automically

  ngOnInit() {
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated()){
      const test = this.userService.getUserInfo("Test");
      console.log("User should be created... " + test);
    }
    else{
      this.button.nativeElement.click();
      console.log("Trigger Login Modal");
    }
  }
}
