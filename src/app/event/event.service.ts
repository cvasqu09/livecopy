import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Event } from './event.model';

import 'rxjs/Rx';

@Injectable()
export class EventService {
	baseURL = "http://localhost:3000/api/events/";

  constructor(private http: Http) { 

  }
  // Get Live Events (add intial set of filters to reduce amount of events sent back)

  
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
  createEvent(event: Event){
  	return this.http.post(this.baseURL, event)
  		.map((response: Response) => {
  			return this.transformIntoEventModel(response)
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json())
  		})
  }

  // Delete Event
  deleteEventWithId(eventId: string){
  	return this.http.delete(this.baseURL + eventId)
  		.map((response:Response) => {
  			return this.transformIntoEventModel(response)
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json());
  		})
  }

  // Report Event

  // Edit Event

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
  		res._id
  	)
  }
}
