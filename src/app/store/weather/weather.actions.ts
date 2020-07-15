import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

// STORE ITEM INTERFACE
import { IWeatherData, IWeatherCoordinatesCity } from './weather.interface';

// SET AUTH
export const SET_WEATHER = createAction('[GET/Weather]', props<{ citiesCoordinates: IWeatherCoordinatesCity[] }>());
export const SET_WEATHER_SUCCESS = createAction('[GET/Weather] Succeful', props<{ weather: IWeatherData[] }>());
export const SET_WEATHER_FAIL = createAction('[GET/Weather] Unsuccessful', props<{ error: HttpErrorResponse }>());
