import { TestBed } from '@angular/core/testing';

import { ImageAssetsUtilsService } from './image.service';

describe('ImageAssetsUtilsService', () => {
	let service: ImageAssetsUtilsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ImageAssetsUtilsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
