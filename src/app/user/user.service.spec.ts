import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
	let userService: UserService;

	beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [HttpModule],
				providers: [UserService]										]
			});
	});

	beforeEach(inject([UserService], (uService) => {
		userService = uService;
	}))

	it('should be instantiated', () => {
		expect(userService).toBeTruthy();
	})

	

});
