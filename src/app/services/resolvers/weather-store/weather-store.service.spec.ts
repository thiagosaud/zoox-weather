import { TestBed } from '@angular/core/testing';

import { WeatherStoreResolver } from './weather-store.service';

describe('WeatherStoreResolver', () => {
	let service: WeatherStoreResolver;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WeatherStoreResolver);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
