import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Event } from '../event/event.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
	user: User = new User("Mr Meeseeks", ["chess", "sports"], ["bbbbbbbbbbbbbbbbbbbbbbbb"], 0, []);
  userCreatedEvents: Array<Event> = [new Event("Chess meeetup", ["chess"], 2,
    [-64.15328979492188, -5.266007882805485], 1000, 1200, "Meetup to play chess", "Chris V", "bbbbbbbbbbbbbbbbbbbbbbbb")]; // Change this to retrieved events from event Service
  constructor(
    private userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {

  }

}
