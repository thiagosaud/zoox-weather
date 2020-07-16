import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ImageAssetsUtilsService {
	constructor() {}

	get(name: string): string {
		switch (name.toLowerCase()) {
			case 'logo':
				return '/assets/images/utils/logo.svg';
			case 'earth':
				return '/assets/images/utils/earth.png';
			case 'earth-locations':
				return '/assets/images/utils/earth_locations.png';
			default:
				throw new Error('This image does not exist in assets!');
		}
	}

	getWeatherCondition(name: string): string {
		switch (name.toLowerCase()) {
			case '01d':
			case '01n':
			case '02d':
			case '02n':
			case '03d':
			case '03n':
			case '04d':
			case '04n':
			case '09d':
			case '09n':
			case '10d':
			case '10n':
			case '11d':
			case '11n':
			case '13d':
			case '13n':
			case '50d':
			case '50n':
			case 'wind':
				return `/assets/images/weather/${name.toLowerCase()}.png`;
			default:
				throw new Error('This image does not exist in assets!');
		}
	}
}
