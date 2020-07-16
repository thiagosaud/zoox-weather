import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-card-weather-informations',
	template: `
		<div>
			<section>
				<span>Pressão:</span>
				<span>Umidade:</span>
				<span>Vento:</span>
			</section>

			<section>
				<span>{{ pressure }} mb</span>
				<span>{{ humidity }} %</span>
				<span>{{ windSpeed }} km/h</span>
			</section>
		</div>
	`,
	styleUrls: ['./card-weather-informations.component.scss'],
})
export class CardWeatherInformationsComponent implements OnInit {
	@Input() pressure: number;
	@Input() humidity: number;
	@Input() windSpeed: number;

	constructor() {}

	ngOnInit(): void {}
}
