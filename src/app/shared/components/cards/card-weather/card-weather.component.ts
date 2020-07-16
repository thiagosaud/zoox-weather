import { Component, OnInit, Input } from '@angular/core';
import { IWeatherForecastList, IWeatherHistoricalData, IWeatherForecastData } from '@app/store/weather/weather.interface';

@Component({
	selector: 'zx-card-weather',
	templateUrl: './card-weather.component.html',
	styleUrls: ['./card-weather.component.scss'],
})
export class CardWeatherComponent implements OnInit {
	@Input() currentDay: IWeatherForecastList;
	@Input() previouesFiveDays: IWeatherHistoricalData;
	@Input() nextFiveDays: IWeatherForecastData;

	constructor() {}

	ngOnInit(): void {}
}
