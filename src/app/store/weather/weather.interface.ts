import { EntityState } from '@ngrx/entity';

// STORE ITEM INTERFACES
export interface IEntityState extends EntityState<IWeatherData> {
	loading: boolean;
	weather: IWeatherData[] | null;
	error: any | null;
}

export interface IWeatherData {
	id: string; // CITY NAME
	currentDay: IWeatherForecastList;
	previousFiveDays: IWeatherHistoricalData;
	nextFiveDays: IWeatherForecastData;
}

export interface IWeatherHistoricalData {
	current?: IWeatherInformation;
	hourly: IWeatherInformation[];
	lat?: number;
	lon?: number;
	timezone: string;
	timezone_offset?: number;
}

export interface IWeatherForecastData {
	cod?: string;
	message?: number;
	cnt?: number;
	list: IWeatherForecastList[];
	city: {
		id: number;
		name: string;
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
		coord?: IWeatherCoordinatesCity;
	};
}

export interface IWeatherCoordinatesCity {
	lat: string;
	lon: string;
}

export interface IWeatherForecastList {
	dt: number;
	dt_txt: string;
	weather: IWeather[];
	clouds?: { all: number };
	wind: { speed: number; deg: number };
	sys?: { pod: string };
	main: {
		temp: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
		temp_kf: number;
	};
}

export interface IWeatherCondition {
	dt: string | number;
	isSelected: boolean;
	weather: {
		description: string;
		icon: string;
		temp?: number;
		temp_min?: number;
		temp_max?: number;
		windSpeed: number;
		humidity: number;
		pressure: number;
	};
}

interface IWeather {
	id?: number;
	main?: string;
	description: string;
	icon: string;
}

interface IWeatherInformation {
	clouds: number;
	dew_point: number;
	dt: number;
	feels_like: number;
	humidity: number;
	pressure: number;
	sunrise: number;
	sunset: number;
	temp: number;
	uvi?: number;
	wind_deg: number;
	wind_gust: number;
	wind_speed: number;
	weather: IWeather[];
}
