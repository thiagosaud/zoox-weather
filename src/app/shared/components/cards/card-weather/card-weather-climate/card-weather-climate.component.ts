import { Component, OnInit, Input } from '@angular/core';

// SERVICE
import { ImageAssetsUtilsService } from '@services/utils/assets/image.service';

@Component({
	selector: 'zx-card-weather-climate',
	template: `
		<div>
			<zx-image [theme]="'small'" [src]="imageAssets.getWeatherCondition(conditionIcon)"></zx-image>
			<span>{{ maxTemp }}°</span>
		</div>
	`,
	styleUrls: ['./card-weather-climate.component.scss'],
})
export class CardWeatherClimateComponent implements OnInit {
	@Input() conditionIcon: string;
	@Input() maxTemp: number;

	constructor(public readonly imageAssets: ImageAssetsUtilsService) {}

	ngOnInit(): void {}
}
