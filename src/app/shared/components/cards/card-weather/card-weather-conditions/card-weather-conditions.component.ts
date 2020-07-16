import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// INTERFACE
import { IWeatherCondition } from '@store/weather/weather.interface';

// SERVICE
import { ImageAssetsUtilsService } from '@services/utils/assets/image.service';

@Component({
	selector: 'zx-card-weather-conditions',
	template: `
		<div (click)="selectCondition.emit(condition)" *ngFor="let condition of data" [attr.isSelected]="condition.isSelected">
			<span>{{ condition.dt | date: 'MMM' }}</span>

			<zx-image
				[theme]="'small'"
				[ngClass]="['margin-y-2']"
				[src]="imageAssets.getWeatherCondition(condition.weather.icon)"
				[alt]="condition.weather.description"
			></zx-image>

			<span>{{ condition.weather.temp || condition.weather.temp_min }}</span>
		</div>
	`,
	styleUrls: ['./card-weather-conditions.component.scss'],
})
export class CardWeatherConditionsComponent implements OnInit {
	@Output() selectCondition = new EventEmitter<IWeatherCondition>();
	@Input() data: IWeatherCondition[];

	constructor(public readonly imageAssets: ImageAssetsUtilsService) {}

	ngOnInit(): void {}
}
