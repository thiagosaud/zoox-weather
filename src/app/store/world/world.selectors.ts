import { createFeatureSelector, createSelector } from '@ngrx/store';

// STORE ITEM CONFIG
import { IEntityState, IWorldCity } from './world.interface';

const FEATURE_SELECTOR = createFeatureSelector<IEntityState>('world');

// COUNTRIES SELECTORS
export const countries = createSelector(FEATURE_SELECTOR, ({ world }) => (world ? world : null));
export const countriesCreated = createSelector(countries, data => data?.filter(country => country.isCreated));
export const countriesNotCreated = createSelector(countries, data => data?.filter(country => !country.isCreated));

// CITIES SELECTORS
export const citiesCreated = createSelector(countriesCreated, data => {
	if (data) {
		const countriesFiltered: IWorldCity[] = [];

		data?.map(country => country.cities.filter(city => city.isCreated)).forEach(dataFiltered => countriesFiltered.push(...dataFiltered));

		return countriesFiltered;
	}

	return null;
});

export const citiesNotCreated = createSelector(countriesCreated, data => {
	if (data) {
		const countriesFiltered: IWorldCity[] = [];

		data?.map(country => country.cities.filter(city => !city.isCreated)).forEach(dataFiltered => countriesFiltered.push(...dataFiltered));

		return countriesFiltered;
	}

	return null;
});
