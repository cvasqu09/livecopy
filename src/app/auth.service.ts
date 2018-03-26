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

  public logout(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    window.location.reload();
    console.log("Logout Successful!");
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = ''; //Without this, the URL will contain token information
        this.setLocalSession(authResult);
        window.location.reload();
      } else if (err) {
      }
    });

  }

  private setLocalSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.setUserProfile(authResult.idTokenPayload);
  }

  private setUserProfile(userResult): void {
    const accessToken = localStorage.getItem('access_token');

    const self = this;

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if(profile){
        localStorage.setItem("user_id", profile.sub);
      }
      if(err){
        console.log("Problem retrieving profile...\n" + err);
      }
    });
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
