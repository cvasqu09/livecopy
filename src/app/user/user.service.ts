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
  	return this.http.get("http://localhost:3000/api/users/" + userId)
				.map((response: Response) => {
					const res = response.json();
					
					// Convert json array to array of ICENumbers
					let iceNumbers: Array<ICENumber> = []
					for(let number of res.ICENumbers){
						iceNumbers.push(new ICENumber(number.number, number.provider));
					}

					const retrievedUser = new User(
						res.fullName,
						res.categories,
						res.eventIds,
						res.strikes,
						iceNumbers
					)

					return retrievedUser;
				});
  									
  }
  // Report User

 	// Create User

 	// Edit User

 	// get categories

 	// add ICE Number

 	// get ICE Numbers

}
