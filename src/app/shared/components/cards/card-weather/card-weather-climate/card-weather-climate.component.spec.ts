import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWeatherClimateComponent } from './card-weather-climate.component';

describe('CardWeatherClimateComponent', () => {
	let component: CardWeatherClimateComponent;
	let fixture: ComponentFixture<CardWeatherClimateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CardWeatherClimateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CardWeatherClimateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
