import { ActionReducerMap } from '@ngrx/store';

// GLOBAL STORE CONFIG
import IStoreState from './store.interface';

// AUTH STORE ITEM CONFIG'S
import { reducer as fromAuthReducer } from '@store/authentication/auth.reducer';
import { Effects as fromAuthEffects } from '@store/authentication/auth.effects';

// WORLD STORE ITEM CONFIG'S
import { reducer as fromWorldReducer } from '@store/world/world.reducer';
import { Effects as fromWorldEffects } from '@store/world/world.effects';

// WEATHER STORE ITEM CONFIG'S
import { reducer as fromWeatherReducer } from '@store/weather/weather.reducer';
import { Effects as fromWeatherEffects } from '@store/weather/weather.effects';

export const REDUCERS: ActionReducerMap<IStoreState> = {
	authentication: fromAuthReducer,
	world: fromWorldReducer,
	weather: fromWeatherReducer,
};

export const EFFECTS: any[] = [fromAuthEffects, fromWorldEffects, fromWeatherEffects];
