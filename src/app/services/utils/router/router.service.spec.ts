import { TestBed } from '@angular/core/testing';

import { RouterUtilsService } from './router.service';

describe('RouterUtilsService', () => {
	let service: RouterUtilsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RouterUtilsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
