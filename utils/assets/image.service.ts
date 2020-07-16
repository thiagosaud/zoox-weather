import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ImageAssetsUtilsService {
	constructor() {}

	get(name: string): string {
		switch (name.toLowerCase()) {
			case 'user':
				return '/assets/images/temp/thiagobonis.jpg';
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
			case '01d':
			case '02d':
			case '02n':
			case '10d':
			case '10n':
				return `/assets/images/weather/${name.toLowerCase()}.png`;
			case '03d':
			case '03n':
				return '/assets/images/weather/03d.png';
			case '04d':
			case '04n':
				return '/assets/images/weather/04d.png';
			case '09d':
			case '09n':
				return '/assets/images/weather/09d.png';
			case '11d':
			case '11n':
				return '/assets/images/weather/11d.png';
			case '13d':
			case '13n':
				return '/assets/images/weather/13d.png';
			case '50d':
			case '50n':
				return '/assets/images/weather/50d.png';
			default:
				return '/assets/images/weather/404.png';
		}
	}
}
