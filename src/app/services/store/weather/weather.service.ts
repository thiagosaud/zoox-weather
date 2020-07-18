import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// STORE ITEM CONFIG
import IStoreState from '@store/store.interface';
import { IWeatherData, IWeatherCoordinatesCity } from '@store/weather/weather.interface';
import * as action from '@store/weather/weather.actions';
import * as selector from '@store/weather/weather.selectors';

@Injectable({
	providedIn: 'root',
})
export class WeatherStoreService {
	constructor(protected readonly store: Store<IStoreState>) {}

	set(citiesCoordinates: IWeatherCoordinatesCity[]): void {
		this.store.dispatch(action.SET_WEATHER({ citiesCoordinates }));
	}

	get$(): Observable<IWeatherData[] | null> {
		return this.store.pipe(select(selector.getWeather));
	}
}
