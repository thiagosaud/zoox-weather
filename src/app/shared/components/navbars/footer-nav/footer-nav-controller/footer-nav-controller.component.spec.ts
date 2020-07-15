import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNavControllerComponent } from './footer-nav-controller.component';

describe('FooterNavControllerComponent', () => {
	let component: FooterNavControllerComponent;
	let fixture: ComponentFixture<FooterNavControllerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FooterNavControllerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterNavControllerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
