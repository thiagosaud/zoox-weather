import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable, forkJoin } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// STORE ITEM CONFIG
import * as action from './weather.actions';
import { IWeatherForecastData, IWeatherHistoricalData, IWeatherData, IWeatherCoordinatesCity } from './weather.interface';
import { WeatherApiService } from '@services/APIS/weather/weather.service';
import { DateUtilsService } from '@services/utils/date/date.service';

@Injectable()
export class Effects {
	constructor(protected readonly action$: Actions, protected readonly backendService: WeatherApiService, protected readonly dateService: DateUtilsService) {}

	set$ = createEffect(() =>
		this.action$.pipe(
			ofType(action.SET_WEATHER),
			switchMap(({ citiesCoordinates }) => {
				return forkJoin([...this.getHttpRequests(citiesCoordinates)]).pipe(
					map(requests => action.SET_WEATHER_SUCCESS({ weather: this.getFormattedData(requests) })),
					catchError((error: HttpErrorResponse) => of(action.SET_WEATHER_FAIL({ error })))
				);
			})
		)
	);

	/** @description Obtains an array of biforcated https requests observables, so that requests are separated correctly for your particular city */
	protected getHttpRequests(
		coordinates: IWeatherCoordinatesCity[]
	): Observable<{ forecastRequest: IWeatherForecastData; historicalDataRequest: IWeatherHistoricalData }>[] {
		return coordinates.map(city =>
			forkJoin({
				forecastRequest: this.backendService.getForecast(city.lat, city.lon),
				historicalDataRequest: this.backendService.getHistoricalData(city.lat, city.lon, this.dateService.datePreviousFiveDaysUnix.toString()),
			})
		);
	}

	/** @description From the result of the request, the results are formatted in two modalities:
	 * (1) Filtering the date and
	 * (2) Obtaining only the first five indexes
	 */
	protected getFormattedData(requests: { forecastRequest: IWeatherForecastData; historicalDataRequest: IWeatherHistoricalData }[]): IWeatherData[] {
		return requests.map(request => ({
			id: request.forecastRequest.city.name,
			currentDay: request.forecastRequest.list[0],
			previousFiveDays: {
				...request.historicalDataRequest,
				hourly: request.historicalDataRequest.hourly
					.filter(data => this.dateService.isDatePeriodBetweenFiveDays(data.dt, request.historicalDataRequest.timezone))
					.slice(0, 5),
			},
			nextFiveDays: {
				...request.forecastRequest,
				list: request.forecastRequest.list.slice(0, 5),
			},
		}));
	}
}
