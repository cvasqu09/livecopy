import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent implements OnInit {

  @ViewChild('openCreateUserModal') openCreateUserModal:ElementRef;

  public settingsRequest = false;
  public userCatagories = [];
  public catagories: any[] = [
    {
      "name": "Chess",
      "id": "check-tag"
    },
    {
      "name": "Baseball",
      "id": "baseball-tag"
    },
    {
      "name": "Volleyball",
      "id": "volleyball-tag"
    },
    {
      "name": "Disc Golf",
      "id": "disc-golf-tag"
    }
  ] // TODO: Generalize this object for the entire project

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.openCreateUserModal.nativeElement.click();
  }

  triggerNewUserModal(val): void {

    this.settingsRequest = val;
  }

  changeSettingsRequested(): boolean{
    return this.settingsRequest;
  }

  catagorySelected(catagory): void {

    if (this.userCatagories.includes(catagory)){
      this.userCatagories.splice(this.userCatagories.indexOf(catagory),1);
    }
    else {
      this.userCatagories.push(catagory);
    }
  }

  submitNewUser(): void {

    var fullName =  (<HTMLInputElement>document.getElementById("fName")).value + " " +(<HTMLInputElement>document.getElementById("lName")).value;
    const newUser = new User(fullName, this.userCatagories, [], 0, [], localStorage.getItem("user_id"));
    console.log(newUser);
    this.userService.createUser(newUser).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
