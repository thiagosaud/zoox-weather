import { TestBed } from '@angular/core/testing';

import { ZooxApiService } from './zoox.service';

describe('ZooxApiService', () => {
	let service: ZooxApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ZooxApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
