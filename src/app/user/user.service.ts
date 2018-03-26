import 'rxjs/Rx';
import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from './user.model';
import { ICENumber } from '../ice-number/ice-number.model';


@Injectable()
export class UserService {
	baseURL = "http://liveapp-cluster-shard-00-00-jy1qa.mongodb.net:27017/api/users/";

  constructor(private http: Http) {}

  // TODO Add error service for handling any error for popups to each of the functions
  getUserInfo(userId: string): Observable<any>{
  	return this.http.get(this.baseURL + userId)
				.map((response: Response) => {
					return this.transformIntoUserModel(response);
				})
				.catch((error: Response) => {
					// Add logic for error handling service.
					return Observable.throw(error.json());
				});
  }

 	editUser(userId: string, changes: object): Observable<any> {
 		return this.http.patch(this.baseURL + userId, changes)
 			.map((response: Response) => {
 				return this.transformIntoUserModel(response);
 			}).catch((error: Response) => {
 				return Observable.throw(error.json());
 			})
 	}

  reportUser(userId: string): Observable<any> {
  	var strikes: number;
  	/* flatmap will allow us to chain together the http requests since the first one is required in order
  	   for the second one to occur and returns an observable. */
  	return this.getUserInfo(userId).flatMap((user: User) => {
  		strikes = user.strikes
	  	strikes++;

  		// Add logic for blacklisting a user.
			return this.http.patch(this.baseURL + userId, {"strikes": strikes})
			.map((response: Response) => {
				return this.transformIntoUserModel(response);
			})
			.catch((error: Response) => {
				// Add logic for error handling service.
				return Observable.throw(error.json());
			})
  	})
  }


 	createUser(user: User): Observable<any> {
 		return this.http.post(this.baseURL, user)
 			.map((response: Response) => {
 				return this.transformIntoUserModel(response);
 			})
 			.catch((error: Response) => {
 				return Observable.throw(error.json());
 			})
 	}

 	getCategories(userId: string): Observable<any> {
 		return this.http.get(this.baseURL + userId)
 			.map((response: Response) => {
 				const result = response.json();
 				return result.categories;
 			})
 			.catch((error: Response) => {
 				return Observable.throw(error.json());
 			})
 	}

 	addICENumber(user: User, iceNumber: ICENumber): Observable<any> {
 		user.ICENumbers.push(iceNumber)
 		return this.editUser(user._id, user)
 	}

 	getICENumbers(userId: string): Observable<any> {
 		return this.http.get(this.baseURL + userId)
 			.map((response: Response) => {
 				const result = response.json();
 				return result.ICENumbers;
 			})
 			.catch((error: Response) => {
 				return Observable.throw(error.json());
 			})
 	}

 	deleteUserWithId(userId: string): Observable<any> {
 		return this.http.delete(this.baseURL + userId)
 			.map((response: Response) => {
 				return this.transformIntoUserModel(response);
 			})
 			.catch((error: Response) => {
 				return Observable.throw(error.json());
 			})
 	}

 	private transformIntoUserModel(response: Response): User{
		const res = response.json();

		// Convert json array to array of ICENumbers
		let iceNumbers: Array<ICENumber> = []
		for(let number of res.ICENumbers){
			iceNumbers.push(new ICENumber(number.phoneNumber, number.provider));
		}

		const retrievedUser = new User(
			res.fullName,
			res.categories,
			res.eventIds,
			res.strikes,
			iceNumbers,
			res._id
		)

		return retrievedUser;
 	}
}
