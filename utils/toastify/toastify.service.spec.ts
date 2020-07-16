import { TestBed } from '@angular/core/testing';

import { ToastifyUtilsService } from './toastify.service';

describe('ToastifyUtilsService', () => {
	let service: ToastifyUtilsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ToastifyUtilsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
