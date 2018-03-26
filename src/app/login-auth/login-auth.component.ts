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

  @ViewChild('openLoginModal') button:ElementRef;  //Reference to modal button to trigger modal automically

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated()){

      // this.userService.createUser(new User("Test Name", [],[],0,[])).subscribe(response => {
      //   console.log(response);
      // });
      this.userService.getUserInfo('aaXX847edee5847831acb269a4').subscribe(response =>{
        console.log(response);
      });
    }
    else{
      this.button.nativeElement.click();
    }
  }
}
