import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWeatherConditionsComponent } from './card-weather-conditions.component';

describe('CardWeatherConditionsComponent', () => {
	let component: CardWeatherConditionsComponent;
	let fixture: ComponentFixture<CardWeatherConditionsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CardWeatherConditionsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CardWeatherConditionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
