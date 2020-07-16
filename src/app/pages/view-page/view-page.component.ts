import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription, Subscriber, BehaviorSubject } from 'rxjs';

// INTERFACE
import { IWeatherCoordinatesCity, IWeatherData } from '@store/weather/weather.interface';

// SERVICES
import { RouterUtilsService } from '@services/utils/router/router.service';
import { WorldStoreService } from '@services/store/world/world.service';
import { WeatherStoreService } from '@services/store/weather/weather.service';

@Component({
	selector: 'zx-view-page',
	templateUrl: './view-page.component.html',
	styleUrls: ['./view-page.component.scss'],
})
export class ViewPageComponent implements OnInit, OnDestroy {
	protected subscription$ = new Subscription();
	protected subscriber$ = new Subscriber();
	cityCoordinates$ = new BehaviorSubject<IWeatherCoordinatesCity[]>(null);
	weatherList$ = new BehaviorSubject<IWeatherData[] | null>(null);
	weatherList = [
		{
			id: 'São Paulo',
			currentDay: {
				dt: 1594933200,
				main: {
					temp: 19.2,
					feels_like: 18.4,
					temp_min: 19.19,
					temp_max: 19.2,
					pressure: 1021,
					sea_level: 1021,
					grnd_level: 934,
					humidity: 66,
					temp_kf: 0.01,
				},
				weather: [
					{
						id: 802,
						main: 'Clouds',
						description: 'nuvens dispersas',
						icon: '03n',
					},
				],
				clouds: {
					all: 27,
				},
				wind: {
					speed: 2.34,
					deg: 106,
				},
				visibility: 10000,
				pop: 0.11,
				sys: {
					pod: 'n',
				},
				dt_txt: '2020-07-16 21:00:00',
			},
			previousFiveDays: {
				lat: -23.55,
				lon: -46.64,
				timezone: 'America/Sao_Paulo',
				timezone_offset: -10800,
				current: {
					dt: 1594497932,
					sunrise: 1594460914,
					sunset: 1594499715,
					temp: 25.32,
					feels_like: 23.86,
					pressure: 1017,
					humidity: 41,
					dew_point: 11.13,
					uvi: 5.07,
					clouds: 0,
					visibility: 10000,
					wind_speed: 2.6,
					wind_deg: 330,
					weather: [
						{
							id: 800,
							main: 'Clear',
							description: 'céu limpo',
							icon: '01d',
						},
					],
				},
				hourly: [
					{
						dt: 1594458000,
						temp: 14.84,
						feels_like: 14.21,
						pressure: 1021,
						humidity: 87,
						dew_point: 12.7,
						clouds: 75,
						visibility: 3000,
						wind_speed: 2.1,
						wind_deg: 50,
						weather: [
							{
								id: 701,
								main: 'Mist',
								description: 'nevoeiro',
								icon: '50n',
							},
						],
					},
					{
						dt: 1594461600,
						temp: 14.72,
						feels_like: 14.05,
						pressure: 1021,
						humidity: 87,
						dew_point: 12.58,
						clouds: 75,
						visibility: 5000,
						wind_speed: 2.1,
						wind_deg: 70,
						weather: [
							{
								id: 701,
								main: 'Mist',
								description: 'nevoeiro',
								icon: '50d',
							},
						],
					},
					{
						dt: 1594465200,
						temp: 15.08,
						feels_like: 14.17,
						pressure: 1021,
						humidity: 87,
						dew_point: 12.93,
						clouds: 20,
						visibility: 9000,
						wind_speed: 2.6,
						wind_deg: 70,
						weather: [
							{
								id: 801,
								main: 'Clouds',
								description: 'céu pouco nublado',
								icon: '02d',
							},
						],
					},
					{
						dt: 1594468800,
						temp: 17.01,
						feels_like: 16.42,
						pressure: 1021,
						humidity: 82,
						dew_point: 13.92,
						clouds: 3,
						visibility: 10000,
						wind_speed: 2.6,
						wind_deg: 90,
						weather: [
							{
								id: 800,
								main: 'Clear',
								description: 'céu limpo',
								icon: '01d',
							},
						],
					},
					{
						dt: 1594472400,
						temp: 18.89,
						feels_like: 17.89,
						pressure: 1021,
						humidity: 72,
						dew_point: 13.74,
						clouds: 0,
						visibility: 10000,
						wind_speed: 3.1,
						wind_deg: 120,
						weather: [
							{
								id: 800,
								main: 'Clear',
								description: 'céu limpo',
								icon: '01d',
							},
						],
					},
				],
			},
			nextFiveDays: {
				cod: '200',
				message: 0,
				cnt: 40,
				list: [
					{
						dt: 1594933200,
						main: {
							temp: 19.2,
							feels_like: 18.4,
							temp_min: 19.19,
							temp_max: 19.2,
							pressure: 1021,
							sea_level: 1021,
							grnd_level: 934,
							humidity: 66,
							temp_kf: 0.01,
						},
						weather: [
							{
								id: 802,
								main: 'Clouds',
								description: 'nuvens dispersas',
								icon: '03n',
							},
						],
						clouds: {
							all: 27,
						},
						wind: {
							speed: 2.34,
							deg: 106,
						},
						visibility: 10000,
						pop: 0.11,
						sys: {
							pod: 'n',
						},
						dt_txt: '2020-07-16 21:00:00',
					},
					{
						dt: 1594944000,
						main: {
							temp: 18,
							feels_like: 18.06,
							temp_min: 17.67,
							temp_max: 18,
							pressure: 1022,
							sea_level: 1022,
							grnd_level: 935,
							humidity: 74,
							temp_kf: 0.33,
						},
						weather: [
							{
								id: 801,
								main: 'Clouds',
								description: 'céu pouco nublado',
								icon: '02n',
							},
						],
						clouds: {
							all: 15,
						},
						wind: {
							speed: 1.38,
							deg: 49,
						},
						visibility: 10000,
						pop: 0.1,
						sys: {
							pod: 'n',
						},
						dt_txt: '2020-07-17 00:00:00',
					},
					{
						dt: 1594954800,
						main: {
							temp: 16.69,
							feels_like: 16.69,
							temp_min: 16.52,
							temp_max: 16.69,
							pressure: 1021,
							sea_level: 1021,
							grnd_level: 933,
							humidity: 79,
							temp_kf: 0.17,
						},
						weather: [
							{
								id: 800,
								main: 'Clear',
								description: 'céu limpo',
								icon: '01n',
							},
						],
						clouds: {
							all: 3,
						},
						wind: {
							speed: 1.34,
							deg: 34,
						},
						visibility: 10000,
						pop: 0,
						sys: {
							pod: 'n',
						},
						dt_txt: '2020-07-17 03:00:00',
					},
					{
						dt: 1594965600,
						main: {
							temp: 15.87,
							feels_like: 15.42,
							temp_min: 15.84,
							temp_max: 15.87,
							pressure: 1020,
							sea_level: 1020,
							grnd_level: 933,
							humidity: 80,
							temp_kf: 0.03,
						},
						weather: [
							{
								id: 800,
								main: 'Clear',
								description: 'céu limpo',
								icon: '01n',
							},
						],
						clouds: {
							all: 1,
						},
						wind: {
							speed: 1.72,
							deg: 15,
						},
						visibility: 10000,
						pop: 0,
						sys: {
							pod: 'n',
						},
						dt_txt: '2020-07-17 06:00:00',
					},
					{
						dt: 1594976400,
						main: {
							temp: 15.54,
							feels_like: 15.57,
							temp_min: 15.54,
							temp_max: 15.54,
							pressure: 1021,
							sea_level: 1021,
							grnd_level: 934,
							humidity: 80,
							temp_kf: 0,
						},
						weather: [
							{
								id: 801,
								main: 'Clouds',
								description: 'céu pouco nublado',
								icon: '02n',
							},
						],
						clouds: {
							all: 22,
						},
						wind: {
							speed: 0.89,
							deg: 24,
						},
						visibility: 10000,
						pop: 0,
						sys: {
							pod: 'n',
						},
						dt_txt: '2020-07-17 09:00:00',
					},
				],
				city: {
					id: 3448439,
					name: 'São Paulo',
					coord: {
						lat: -23.5475,
						lon: -46.6361,
					},
					country: 'BR',
					population: 10021295,
					timezone: -10800,
					sunrise: 1594892854,
					sunset: 1594931839,
				},
			},
		},
	];

	constructor(
		protected readonly routerUtils: RouterUtilsService,
		protected readonly worldStore: WorldStoreService,
		protected readonly weatherStore: WeatherStoreService
	) {
		this.worldStore.add();
		this.subscription$ = this.routerUtils.citiesParams$.subscribe(params => {
			const regexp = new RegExp('[^a-zA-Z]+', 'g');
			const paramsSplited = params?.split(',');

			if (paramsSplited && paramsSplited.length > 0 && paramsSplited.length <= 3) {
				this.setWeather([...paramsSplited]);
			}
		});
	}

	ngOnInit(): void {
		if (this.cityCoordinates$.getValue()) {
			this.weatherStore.add(this.cityCoordinates$.getValue());
			this.weatherStore.get$();

			this.subscription$ = this.weatherStore.get$().subscribe(weather => {
				this.subscriber$.add(this.weatherList$.next(weather));
			});
		}
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}

	protected setWeather(citiesCodes: string[]): void {
		if (citiesCodes) {
			this.subscription$ = this.worldStore.getCitiesByIds$(citiesCodes).subscribe(cities => {
				if (cities) {
					const citiesCoordinates: IWeatherCoordinatesCity[] = [];
					cities.forEach(city => citiesCoordinates.push({ lat: city.lat, lon: city.lon }));

					this.subscriber$.add(this.cityCoordinates$.next(cities));
				}
			});
		}
	}
}
