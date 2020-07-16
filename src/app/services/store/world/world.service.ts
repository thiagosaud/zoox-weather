import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';

// STORE ITEM CONFIG
import IStoreState from '@store/store.interface';
import { IWorldCountry, IWorldCity } from '@store/world/world.interface';
import * as action from '@store/world/world.actions';
import * as selector from '@store/world/world.selectors';

@Injectable({
	providedIn: 'root',
})
export class WorldStoreService {
	constructor(protected readonly store: Store<IStoreState>) {}

	add(): void {
		this.store.dispatch(action.SET_WORLD());
	}

	update(updates: Update<IWorldCountry>): void {
		this.store.dispatch(action.UPDATE_WORLD({ updates }));
	}

	get countries$(): Observable<IWorldCountry[] | null> {
		return this.store.pipe(select(selector.getCountries));
	}

	get countriesCreated$(): Observable<IWorldCountry[] | null> {
		return this.store.pipe(select(selector.getCountriesCreated));
	}

	get countriesNotCreated$(): Observable<IWorldCountry[] | null> {
		return this.store.pipe(select(selector.getCountriesNotCreated));
	}

	get citiesCreated$(): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.getCitiesCreated));
	}

	getCountryByCityId$(cityId: string): Observable<IWorldCountry | null> {
		return this.store.pipe(select(selector.getCountryByCityId, { cityId }));
	}

	getCitiesNotCreated$(countryId: string): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.getCitiesNotCreated, { countryId }));
	}

	getCities$(countryId: string): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.getCities, { countryId }));
	}

	getCitiesByIds$(citiesIds: string[]): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.getCitiesByIds, { citiesIds }));
	}
}
