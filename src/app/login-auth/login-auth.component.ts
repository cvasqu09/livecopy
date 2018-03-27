import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
  providers: [UserService, ProfileSettingsComponent]
})

export class LoginAuthComponent implements OnInit {

  @ViewChild('openLoginModal') openLoginModal:ElementRef;  //Reference to modal button to trigger modal automically

  constructor(public auth: AuthService, private userService: UserService, private profileSettings: ProfileSettingsComponent) {}

  ngOnInit() {
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated()){

      this.userService.getUserInfo(localStorage.getItem('user_id')).subscribe(
        response => {
          console.log(response);
        },
        error => {
          this.profileSettings.triggerNewUserModal(true);
        }
      );
    }
    else{
      this.openLoginModal.nativeElement.click();
    }
  }
}
