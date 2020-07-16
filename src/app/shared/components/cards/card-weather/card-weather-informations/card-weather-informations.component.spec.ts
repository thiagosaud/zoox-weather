import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWeatherInformationsComponent } from './card-weather-informations.component';

describe('CardWeatherInformationsComponent', () => {
	let component: CardWeatherInformationsComponent;
	let fixture: ComponentFixture<CardWeatherInformationsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CardWeatherInformationsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CardWeatherInformationsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
