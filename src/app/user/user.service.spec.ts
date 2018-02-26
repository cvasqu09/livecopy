import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { User } from './user.model'; 
import { ICENumber } from '../ice-number/ice-number.model';

/* These are integration tests that actually make HTTP requests. Clean up is needed for requests that may modify
   existing data. In case of resetting the test data visit the TeamCity server and run the Clean and Seed build configuraiton */
describe('UserService', () => {
	let userService: UserService;
	let id = "aa847edee5847831acb269a4";

	beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [HttpModule],
				providers: [UserService]										
			});

			userService = TestBed.get(UserService);
	});

	it('should be instantiated', () => {
		expect(userService).toBeTruthy();
	})


	describe('getUserInfo', () => {
		it('should return a user with the correct info', async(() => {
			userService.getUserInfo(id).subscribe((user) => {
				expect(user instanceof User).toBe(true);
				expect(user.fullName).toBe("Josh Stuve");
				expect(user.strikes).toBe(0);
				expect(user.ICENumbers.length).toBe(2);
				expect(user.ICENumbers[0] instanceof ICENumber).toBe(true);
			})
		}))
	})

	describe('editUser', () => {
		afterEach(async(() => {
			userService.editUser(id, 
				{"fullName": "Josh Stuve", "categories": ["gaming", "sports", "other category"], "strikes": 0})
				.subscribe();
		}));

		it('should edit the name of the user', async(() => {
			userService.editUser(id, {"fullName": "Magnus Carlsen"}).subscribe((user: User) => {
				expect(user.fullName).toBe("Magnus Carlsen")
			})
		}))

		it('should edit the categories for a user', async(() => {
			userService.editUser(id, {"categories": ["chess", "programming"]}).subscribe((user: User) => {
				expect(user.categories).toContain("chess");
				expect(user.categories).toContain("programming");
			})
		}))

	});

	describe('reportUser', () => {
		afterEach(async(() => {
			userService.editUser(id, 
				{"fullName": "Josh Stuve", "categories": ["gaming", "sports", "other category"], "strikes": 0})
				.subscribe();
		}));

		it('should update the number of strikes', async(() => {
			userService.getUserInfo(id).subscribe((user: User) => {
				expect(user).toBeTruthy();
				expect(user.strikes).toBe(0);
				var strikesBeforeCall = user.strikes
				userService.reportUser(id).subscribe((response: User) => {
					expect(response.strikes).toBe(strikesBeforeCall + 1);
					expect(response._id).toBe(id)
				})
			})
		}))
	})

	describe('createUser', () => {
		it('should create a new user with the given info', async(() => {
			const user = new User("test user", ["chess"], [], 0, [], "ff847edee5847831acb269a4");
			userService.createUser(user).subscribe((response: User) => {
				expect(response).toEqual(user);
			})
		}))
	})

	

});
