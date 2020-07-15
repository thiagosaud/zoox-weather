export default interface IEnvironment {
	production: boolean;
	APIS: {
		server: {
			userUrl: string;
			worldUrl: string;
		};
		weather: {
			host: string;
			masterKey: string;
			historialUrl: string;
			forecastUrl: string;
		};
	};
}
