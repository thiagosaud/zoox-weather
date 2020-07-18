import { TestBed } from '@angular/core/testing';

import { WorldStoreResolver } from './world-store.service';

describe('WorldStoreResolver', () => {
	let service: WorldStoreResolver;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WorldStoreResolver);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
