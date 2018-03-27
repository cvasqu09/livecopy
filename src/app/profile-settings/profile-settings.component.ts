import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent implements OnInit, AfterViewInit {

  @ViewChild('openCreateUserModal') openCreateUserModal:ElementRef;

  public settingsRequest = false;
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

  constructor(private openCreateUserModal:ElementRef) { }

  ngOnInit() {
    this.openCreateUserModal.nativeElement.click();
  }

  triggerNewUserModal(val): void {

    this.settingsRequest = val;
    //const newUser = new User("Test Name", [], [], 0, []);

    // this.userService.createUser(newUser).subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );
  }

  changeSettingsRequested(): boolean{
    return this.settingsRequest;
  }

  catagorySelected(catagory): void {

    console.log(catagory);
  }

  submitNewUser(): void {

    console.log("New User submitted");
  }
}
