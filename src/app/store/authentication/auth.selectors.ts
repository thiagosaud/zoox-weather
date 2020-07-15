import { createFeatureSelector, createSelector } from '@ngrx/store';

// STORE ITEM CONFIG
import { IEntityState } from './auth.interface';

const FEATURE_SELECTOR = createFeatureSelector<IEntityState>('authentication');

// GETTER'S
export const getAuth = createSelector(FEATURE_SELECTOR, ({ auth }) => (auth ? auth : null));
export const getUserAuth = createSelector(getAuth, auth => (auth ? auth.user : null));
