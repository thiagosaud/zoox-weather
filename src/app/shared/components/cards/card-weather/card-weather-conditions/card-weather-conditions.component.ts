import { Component, OnInit, Input } from '@angular/core';

// SERVICES
import { ImageAssetsUtilsService } from '@services/utils/assets/image.service';

@Component({
	selector: 'zx-card-weather-conditions',
	template: `
		<div [attr.isSelected]="true">
			<span>{{ dayOfTheWeek }}</span>
			<zx-image [theme]="'small'" [ngClass]="['margin-y-2']" [src]="imageAssets.getWeatherCondition(conditionIcon)" [alt]="conditionType"></zx-image>
			<span>{{ minTemp }}° {{ maxTemp }}°</span>
		</div>
	`,
	styleUrls: ['./card-weather-conditions.component.scss'],
})
export class CardWeatherConditionsComponent implements OnInit {
	@Input() conditionIcon: string;
	@Input() conditionType: string;
	@Input() dayOfTheWeek: string;
	@Input() minTemp: number;
	@Input() maxTemp: number;

	constructor(public readonly imageAssets: ImageAssetsUtilsService) {}

	ngOnInit(): void {}
}
