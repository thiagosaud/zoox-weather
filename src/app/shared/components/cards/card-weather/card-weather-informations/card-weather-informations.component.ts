import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-card-weather-informations',
	template: `
		<div>
			<span>Pressão: {{ pressure }}</span>
			<span>Umidade: {{ humidity }}%</span>
			<span>Vento: {{ windSpeed }}km/h</span>
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
