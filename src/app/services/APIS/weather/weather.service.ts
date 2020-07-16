import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

// STORE ITEMS CONFIG
import { IWeatherHistoricalData, IWeatherForecastData } from '@store/weather/weather.interface';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
	protected readonly host = environment.APIS.weather.host;
	protected readonly key = environment.APIS.weather.masterKey;
	protected readonly historicalUrl = environment.APIS.weather.historialUrl;
	protected readonly forecastUrl = environment.APIS.weather.forecastUrl;

	constructor(protected readonly http: HttpClient) {}

	protected get headers(): HttpHeaders {
		const headers = new HttpHeaders({
			'X-RapidAPI-Host': this.host,
			'X-RapidAPI-Key': this.key,
			useQueryString: 'true',
		});

		return headers;
	}

	protected getParams(lt: string, ln: string, unix?: string): HttpParams {
		const params = {
			lat: lt,
			lon: ln,
			lang: 'pt',
			units: 'metric',
		};

		if (unix) {
			Object.assign(params, { dt: unix });
		}

		return new HttpParams({ fromObject: { ...params } });
	}

	getHistoricalData(lat: string, lon: string, unix: string): Observable<IWeatherHistoricalData> {
		return this.http.get<IWeatherHistoricalData>(this.historicalUrl, {
			headers: this.headers,
			params: this.getParams(lat, lon, unix),
		});
	}

	getForecast(lat: string, lon: string): Observable<IWeatherForecastData> {
		return this.http.get<IWeatherForecastData>(this.forecastUrl, {
			headers: this.headers,
			params: this.getParams(lat, lon),
		});
	}
}
