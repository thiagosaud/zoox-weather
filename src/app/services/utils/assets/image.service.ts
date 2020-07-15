import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ImageAssetsUtilsService {
	constructor() {}

	get(name: string) {
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
}
