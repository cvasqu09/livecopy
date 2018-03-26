import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
  providers: [UserService]
})
export class LoginAuthComponent implements OnInit {

  @ViewChild('openLoginModal') button:ElementRef;

  constructor(public auth: AuthService, private userService: UserService) {} //Reference to modal button to trigger modal automically

  ngOnInit() {
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated()){

      console.log("Check user")
    }
    else{
      this.button.nativeElement.click();
    }
  }


}
