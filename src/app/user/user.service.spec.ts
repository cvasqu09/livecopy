import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { User } from './user.model'; 
import { ICENumber } from '../ice-number/ice-number.model';
import { Observable } from "rxjs";


/* These are integration tests that actually make HTTP requests. Clean up is needed for requests that may modify
   existing data. In case of resetting the test data visit the TeamCity server and run the Clean and Seed build configuraiton */
describe('UserService', () => {
	let userService: UserService;
	let id = "aa847edee5847831acb269a4";
	const testUser = new User("Josh Stuve", ["gaming", "sports", "other category"], [], 0,
													[new ICENumber("999999999", "att"), new ICENumber("888888888", "att")], "aa847edee5847831acb269a4");

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
			userService.editUser(id, testUser)
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

		it('should edit the ICENumbers for a user', async(() => {
			userService.editUser(id, {"ICENumbers": [{"phoneNumber": "123456789", "provider": "att"}]}).subscribe((user: User) => {
				expect(user.ICENumbers.length).toBe(1);
				expect(user.ICENumbers[0].phoneNumber).toBe("123456789")
			})
		}))

	});

	describe('reportUser', () => {
		afterEach(async(() => {
			userService.editUser(id, testUser).subscribe();
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

	describe('createUser with valid info', () => {
		afterEach(async(() => {
			userService.deleteUserWithId("ff847edee5847831acb269a4").subscribe();
		}))

		it('should create a new user with the given info', async(() => {
			const user = new User("test user", ["chess"], [], 0, [], "ff847edee5847831acb269a4");
			userService.createUser(user).subscribe((response: User) => {
				expect(response).toEqual(user);
			})
		}))
	})

	describe('createUser with invalid info', () => {
		it('should throw a bad request', async(() => {
			const invalidUser = new User(null, [], [], 0, [])
			userService.createUser(invalidUser).subscribe(
				(response) => {
					throw(new Error('Should not have saved user'))
				},
				(error) => {
					expect(error.status).toEqual(400);
				})
		}))
	})

	describe('deleteUser', () => {
		it('should delete the user from the database', async(() => {
			userService.createUser(new User("test user", [], [], 0, [], "ffffffdee5847831acb269a4")).subscribe();
			userService.deleteUserWithId("ffffffdee5847831acb269a4").subscribe((response) => {
				  expect(response._id).toEqual("ffffffdee5847831acb269a4")
			})
		}))

		it('should return error if user is not found', async(() => {
			userService.deleteUserWithId("ffffffffffffffffffffffff").subscribe(
				(response) => {
					throw(new Error("Shouldn't have deleted anything"))
				}, 
				(error) => {
					expect(error.title).toEqual('Error finding user');
			})
		}))
	})

	describe('getCategories', () => {
		it('should return the correct categories for a valid user', async(() => {
			userService.getCategories(id).subscribe((response) => {
				expect(response.length).toEqual(3);
				expect(response[0]).toEqual("gaming");
				expect(response[1]).toEqual("sports");
				expect(response[2]).toEqual("other category");
			})
		}))

		it('should return a user could not be found error msg if a valid id is given', async(() => {
			userService.getCategories("ffffffffffffffffffffffff").subscribe(
				res => {
					throw Error("Should not have found a user")
				},
				err => {
					expect(err.title).toEqual('User not found')
				}
			)
		}))
	})

	describe('addICENumber', () => {
		afterEach(async(() => {
			// testUser from outermost describe is not available here as the afterEach hook is global. 
			const testUser = new User("Josh Stuve", ["gaming", "sports", "other category"], [], 0,
													[new ICENumber("999999999", "att"), new ICENumber("888888888", "att")], "aa847edee5847831acb269a4");
			userService.editUser(testUser._id, testUser).subscribe(res => {
				console.log(res)
			}, err => {
				console.log("error: " + err);
			});
		}))

		it("should add the ICE number to the user's ICE numbers", async(() => {
			const iceNumber = new ICENumber('9158557085', 'att');;

			userService.addICENumber(testUser, iceNumber).subscribe((response: User) => {
				expect(response.ICENumbers.length).toBe(3)
				expect(response.ICENumbers[2].phoneNumber).toBe("9158557085")
			})
		}))
	})

	describe('getICENumbers', () => {
		it("should return the user's ICENumbers", async(() => {
			userService.getICENumbers(testUser._id).subscribe((response) => {
				expect(response.length).toBe(2);
				expect(response[0].phoneNumber).toBe("999999999");
				expect(response[1].phoneNumber).toBe("888888888");
			})
		}))

		it("should return an error if invalid user is given", async(() => {
			userService.getICENumbers("123321456563447569854124").subscribe(
			(response) => {
				throw(new Error("Shouldn't have found this user"))
			},
			(error) => {
				expect(error.title).toBe("User not found")
				expect(error.status).toBe(404)
			})
		}))
	})
});
