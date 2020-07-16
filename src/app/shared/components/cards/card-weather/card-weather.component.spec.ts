import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWeatherComponent } from './card-weather.component';

describe('CardWeatherComponent', () => {
	let component: CardWeatherComponent;
	let fixture: ComponentFixture<CardWeatherComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CardWeatherComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CardWeatherComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
