import { Event } from './event.model'
import { EventService } from './event.service';
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from "rxjs";


describe('EventService', () => {
	let eventService = null;
	let testId = "5a847edee5847831acb269a4";

	beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [HttpModule],
				providers: [EventService]										
			});

			eventService = TestBed.get(EventService);
	});


  it('should be instantiated', () => {
  	expect(eventService).toBeTruthy();
  });

  describe('getEventById', () => {
  	it('should return the event with the correct info', async(() => {
  		eventService.getEventById(testId).subscribe((event: Event) => {
  			expect(event.location).toBe("537 Paper Street, Bradford")
  			expect(event.eventOwner).toBe("Dhruuv Khurana")
  			expect(event.numPeople).toBe(2)
  			expect(event.endTime).toBe(1000)
  		})
  	}))

  	it('should return an error if event is not found', async(() => {
  		eventService.getEventById("ffffffffffffffffffffffff").subscribe(
  			(event) => { throw new Error("Shouldn't have found event") },
  			(error) => { expect(error.title).toBe('No event found') }
  		)})
  	)
  })

  describe('deleteEventWithId with a valid id', () => {
  	const testEvent = new Event("Black Panther", ["movie"], 1, "Wakanda", 800, 1000,
															"Watch it", "T'chala", "fffffffffffffffffffffffa")
  	beforeEach(() => {
  		eventService.createEvent(testEvent).subscribe()
  	})

  	it('should delete the event with the given id', async(() => {
			eventService.deleteEventWithId(testEvent._id).subscribe((response) => {
				eventService.getEventById(testEvent._id).subscribe(
					res => {
						throw new Error("Shouldn't have found event")
					},
					error => {
						expect(error.title).toBe('No event found')
					})
			})  		
  	}))
  })

  describe('deleteEventWithId with invalid id', () => {
  	const invalidTestId = "123456789123456789123456";
  	it('should return an error that the event was not found', async(() => {
  		eventService.deleteEventWithId(invalidTestId).subscribe(
  			res => {
  				throw new Error("Shouldn't have deleted event with invalid id")
  			},
  			err => {
  				expect(err.title).toBe('Error finding event')
  			})
  	}))
  })

  describe('createEvent with valid data', () => {
  	const testEvent = new Event("Black Panther", ["movie"], 1, "Wakanda", 800, 1000,
  																"Watch it", "T'chala", "ffffffffffffffffffffffff", 0)
  	afterEach(async(() => {
  		eventService.deleteEventWithId(testEvent._id).subscribe()
  	}))

  	it('should return the event that was created for valid data', async(() => {
  		eventService.createEvent(testEvent).subscribe((response: Event) => {
  			expect(response).toEqual(testEvent)
  		})
  	}))
  })

  describe('createEvent with invalid data', () => {
  	it('should return an error if the event has invalid data', async(() => {
  		const malformedTestEvent = new Event("Bad test", null, 1, "Wonderland", 100, 200,
  																				 "Place description here", null, "aaaaaaaaaaaaaaaaaaaaaaaa")
  		eventService.createEvent(malformedTestEvent).subscribe(
  			(response) => {
  				throw(new Error("Shouldn't have created an event"))
  			},
  			(error) => {
  				expect(error.title).toBe('Bad request')
  			})
  	}))
  })

  describe('editEvent', () => {
		const testEvent = new Event("Watch Fight Club", ["category1"], 0, "123 Street",
																200, 330, "watch the movie", "Chris V", "bbbbbbbbbbbbbbbbbbbbbbbb")
		const updatedEvent = new Event("Watch Breakfast Club", ["movie"], 1, "1234 Street",
																	 400, 500, "Watch this", "Chris V", "bbbbbbbbbbbbbbbbbbbbbbbb", 0)
		beforeEach(async(() => {
			eventService.createEvent(testEvent).subscribe()
		}))

		afterEach(async(() => {
			eventService.deleteEventWithId("bbbbbbbbbbbbbbbbbbbbbbbb").subscribe()
		}))

  	it('should return the updated event for valid changes', async(() => {
  		eventService.editEventWithId("bbbbbbbbbbbbbbbbbbbbbbbb", updatedEvent).subscribe(res => {
  			expect(res).toEqual(updatedEvent);
  		})
  	}))

  	it('should return an error if invalid changes are provided', async(() => {
  		const eventWithoutCategories = new Event("invalid event", [], 0, "here", 100, 200,
  																						 "I am invalid", "Random", "bbbbbbbbbbbbbbbbbbbbbbbb")
  		eventService.editEventWithId("bbbbbbbbbbbbbbbbbbbbbbbb", eventWithoutCategories).subscribe(
  			res => {
  				throw new Error("Shouldn't have accepted changes")
  			},
  			err => {
  				expect(err.error.message).toContain('Validation failed:')
  			})
  	}))
  })

  describe('reportEventWithId', () => {
  	const testEvent = new Event("Black Panther", ["movie"], 1, "Wakanda", 800, 1000,
														"Watch it", "T'chala", "ffffffffffffffffffffffff", 0)
  	beforeEach(async(() => {
  		eventService.createEvent(testEvent).subscribe()
  	}))

  	afterEach(async(() => {
  		eventService.deleteEventWithId(testEvent._id).subscribe()
  	}))

  	it('should update the number of reports for the event', async(() => {
  		eventService.reportEventWithId(testEvent._id).subscribe(res => {
  			expect(res.reports).toBe(1)
  		})
  	}))
  })
});
