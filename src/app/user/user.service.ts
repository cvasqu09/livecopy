import 'rxjs/Rx';
import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from './user.model';
import { ICENumber } from '../ice-number/ice-number.model';


@Injectable()
export class UserService {

  constructor(private http: Http) {}

  // Get User Info
  getUserInfo(userId: string){
  	return this.http.get("http://localhost:3000/api/users/" + userId);
  																			

  										// const retrievedUser = new User(
  										// 	result.fullName,
  										// 	result.categories,
  										// 	result.eventIds,

  										// 	);
  									
  }
  // Report User

 	// Create User

 	// Edit User

 	// get categories

 	// add ICE Number

 	// get ICE Numbers

}
