import IEnvironment from '@shared/interfaces/enviroment.interface';

export const environment: IEnvironment = {
	production: true,
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
