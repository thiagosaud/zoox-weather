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

	// STORE ITEM ACTIONS
	set(): void {
		this.store.dispatch(action.SET_WORLD());
	}

	update(updates: Update<IWorldCountry>): void {
		this.store.dispatch(action.UPDATE_WORLD({ updates }));
	}

	// STORE ITEM SELECTORS
	get countries$(): Observable<IWorldCountry[] | null> {
		return this.store.pipe(select(selector.countries));
	}

	get countriesCreated$(): Observable<IWorldCountry[] | undefined> {
		return this.store.pipe(select(selector.countriesCreated));
	}

	get countriesNotCreated$(): Observable<IWorldCountry[] | undefined> {
		return this.store.pipe(select(selector.countriesNotCreated));
	}

	get citiesCreated$(): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.citiesCreated));
	}

	get citiesNotCreated$(): Observable<IWorldCity[] | null> {
		return this.store.pipe(select(selector.citiesNotCreated));
	}
}
