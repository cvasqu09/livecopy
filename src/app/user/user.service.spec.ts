import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { User } from './user.model'; 
import { ICENumber } from '../ice-number/ice-number.model';

// These are integration tests that actually make HTTP requests. 
describe('UserService', () => {
	let userService: UserService;

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


	// describe('getUserInfo', () => {
	// 	it('should return a user with the correct info', async(() => {
	// 		userService.getUserInfo("aa847edee5847831acb269a4").subscribe((user) => {
	// 			expect(user instanceof User).toBe(true);
	// 			expect(user.fullName).toBe("Josh Stuve");
	// 			expect(user.strikes).toBe(0);
	// 			expect(user.ICENumbers.length).toBe(2);
	// 			expect(user.ICENumbers[0] instanceof ICENumber).toBe(true);
	// 		})
	// 	}))
	// })

	describe('reportUser', () => {
		let id = "aa847edee5847831acb269a4";

		it('should update the number of strikes', async(() => {
			userService.getUserInfo(id).subscribe((user: User) => {
				expect(user).toBeTruthy();
				expect(user.strikes).toBe(0);
				var strikesBeforeCall = user.strikes
				userService.reportUser(id).subscribe((response: User) => {
					expect(response.strikes).toBe(strikesBeforeCall + 1);
				})
			})
		}))

	})

	

});
