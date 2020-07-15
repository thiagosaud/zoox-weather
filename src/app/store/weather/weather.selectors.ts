import { createFeatureSelector, createSelector } from '@ngrx/store';

// STORE ITEM CONFIG
import { IEntityState } from './weather.interface';

const FEATURE_SELECTOR = createFeatureSelector<IEntityState>('weather');

// GETTER'S
export const getWeather = createSelector(FEATURE_SELECTOR, ({ weather }) => (weather ? weather : null));
