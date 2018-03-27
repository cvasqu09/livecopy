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

  @ViewChild('openLoginModal') openLoginModal:ElementRef;  //Reference to modal button to trigger modal automically
  @ViewChild('openCreateUserModal') openCreateUserModal:ElemenRef;

  public catagories: string[] = [
    {
      "name": "Chess",
      "id": "check-tag"
    },
    {
      "name": "Baseball",
      "id": "baseball-tag"
    }
  ]

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated()){

      this.userService.getUserInfo('google-oauth2|110192101898249391522').subscribe(
        response => {
          console.log("We got it boys");
        },
        error => {
          this.createNewUserForm();
        }
      );
    }
    else{
      this.openLoginModal.nativeElement.click();
    }
  }

  createNewUserForm(): void {

    this.openCreateUserModal.nativeElement.click();

    //const newUser = new User("Test Name", [], [], 0, []);

    // this.userService.createUser(newUser).subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );
  }

  submitNewUser(){


  }

  addCatagory(cat){
    console.log("Clicked: " + cat.checked);
  }
}
