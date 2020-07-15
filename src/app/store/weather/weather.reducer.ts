import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

// STORE ITEM CONFIG'S
import { IEntityState, IWeatherData } from './weather.interface';
import * as weatherAction from './weather.actions';

export const adapter: EntityAdapter<IWeatherData> = createEntityAdapter<IWeatherData>({
	selectId: weather => weather.id,
});

const INITIAL_STATE: IEntityState = adapter.getInitialState({
	loading: false,
	weather: null,
	error: null,
});

const stateTransition = createReducer(
	INITIAL_STATE,
	on(weatherAction.SET_WEATHER, state => ({ ...state, loading: true })),
	on(weatherAction.SET_WEATHER_SUCCESS, (state, { weather }) => adapter.upsertMany(weather, { ...state, weather, loading: false })),
	on(weatherAction.SET_WEATHER_FAIL, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: IEntityState | undefined, action: Action) {
	return stateTransition(state, action);
}
