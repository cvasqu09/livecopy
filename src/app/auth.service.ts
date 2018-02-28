import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'YdXJArBHl5cZiJP9Fjp4aCv2wd4LsYBg',
    domain: 'jstuve.auth0.com',
    responseType: 'token id_token',
    audience: 'https://jstuve.auth0.com/userinfo',
    scope: 'openid profile'
  });

  constructor() { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
    });
  }
}
