// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import IEnvironment from '@shared/interfaces/enviroment.interface';

export const environment: IEnvironment = {
	production: false,
	APIS: {
		server: {
			userUrl: 'http://localhost:4300/user',
			worldUrl: 'http://localhost:4300/world',
		},
		weather: {
			host: 'community-open-weather-map.p.rapidapi.com',
			masterKey: 'INSERT THE KEY',
			historialUrl: 'https://community-open-weather-map.p.rapidapi.com/onecall/timemachine',
			forecastUrl: 'https://community-open-weather-map.p.rapidapi.com/forecast',
		},
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
