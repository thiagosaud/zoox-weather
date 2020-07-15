import { TestBed } from '@angular/core/testing';

import { WorldStoreService } from './world.service';

describe('WorldStoreService', () => {
	let service: WorldStoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WorldStoreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
