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

	getCountries$(): Observable<IWorldCountry[] | null> {
		return this.store.pipe(select(selector.getCountries));
	}

	getCountriesCreated$(): Observable<IWorldCountry[] | null> {
		return this.store.pipe(select(selector.getCountriesCreated));
	}

	getCountriesNotCreated$(): Observable<IWorldCountry[] | null> {
		return this.store.pipe(select(selector.getCountriesNotCreated));
	}

	getCitiesCreated$(): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.getCitiesCreated));
	}

	getCitiesNotCreated$(countryId: string): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.getCitiesNotCreated, { countryId }));
	}
}
