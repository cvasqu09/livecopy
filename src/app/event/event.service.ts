import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Event } from './event.model';

import 'rxjs/Rx';

@Injectable()
export class EventService {
	baseURL = "http://localhost:3000/api/events/";

	// TODO add authentication service to verify a user is logged in before making the requests
  constructor(private http: Http) { 

  }
  // Get Live Events (add intial set of filters to reduce amount of events sent back?)

  
  // Get EventById
  getEventById(eventId: string): Observable<any> {
  	return this.http.get(this.baseURL + eventId)
  		.map((response: Response) => {
  			return this.transformIntoEventModel(response);
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json())
  		})
  }


  // Create Event
  createEvent(event: Event): Observable<any> {
  	return this.http.post(this.baseURL, event)
  		.map((response: Response) => {
  			return this.transformIntoEventModel(response)
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json())
  		})
  }

  // Delete Event
  deleteEventWithId(eventId: string): Observable<any> {
  	return this.http.delete(this.baseURL + eventId)
  		.map((response:Response) => {
  			return this.transformIntoEventModel(response)
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json());
  		})
  }

  // Report Event
  reportEventWithId(eventId: string): Observable<any> {
  	return this.getEventById(eventId).flatMap((event: Event) => {
      const reports = event.reports + 1;
      return this.http.patch(this.baseURL + eventId, {"reports": reports})
        .map((response: Response) => {
          return this.transformIntoEventModel(response);
        })
        .catch((error: Response) => {
          debugger
          console.log(error)
  				return Observable.throw(error)
  			})
  	})
  }

  // Edit Event
  editEventWithId(eventId: string, changes: object): Observable<any> {
  	return this.http.patch(this.baseURL + eventId, changes)
  		.map((response: Response) => {
  			return this.transformIntoEventModel(response);
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json());
  		})
  }


  // update event

  private transformIntoEventModel(response: Response): Event {
  	const res = response.json();
  	return new Event(
  		res.eventName,
  		res.categories,
  		res.numPeople,
  		res.location,
  		res.startTime,
  		res.endTime,
  		res.description,
  		res.eventOwner,
  		res._id,
  		res.reports
  	)
  }
}
