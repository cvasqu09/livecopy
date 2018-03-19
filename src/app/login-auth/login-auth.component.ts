import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {

  constructor(public auth: AuthService) {
    auth.handleAuthentication(); // This will run on load.
  }

  ngOnInit() {
  }
}
