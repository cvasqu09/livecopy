import 'rxjs/Rx';
import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from './user/user.model';

@Injectable()
export class MessagingService{
  constructor(private http: Http) {}

  // Given a user's id, this will send notification texts to the provided user's ICE Numbers 
  sendNotificationTexts(){
  	return this.http.post("http://localhost:3000/api/sms/", {"id": "aa847edee5847831acb269a4"})
  		.map((response) => {
  			const res = response.json();
  			console.log(res);
  			return res;
  		})
  		.catch((error) => {
  			return Observable.throw(error);
  		})
  }

}