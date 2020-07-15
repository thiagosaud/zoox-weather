import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

// STORE ITEM CONFIG'S
import { IEntityState, IWorldCountry } from './world.interface';
import * as worldAction from './world.actions';

export const adapter: EntityAdapter<IWorldCountry> = createEntityAdapter<IWorldCountry>({
	selectId: world => world.id,
});

const INITIAL_STATE: IEntityState = adapter.getInitialState({
	loading: false,
	world: null,
	error: null,
});

const stateTransition = createReducer(
	INITIAL_STATE,
	on(worldAction.SET_WORLD, worldAction.UPDATE_WORLD, state => ({ ...state, loading: true })),
	on(worldAction.SET_WORLD_SUCCESS, (state, { world }) => adapter.addMany(world, { ...state, world, loading: false })),
	on(worldAction.UPDATE_WORLD_SUCCESS, (state, { updates }) => adapter.updateOne(updates, { ...state, updates, loading: false })),
	on(worldAction.SET_WORLD_FAIL, worldAction.UPDATE_WORLD_FAIL, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: IEntityState | undefined, action: Action) {
	return stateTransition(state, action);
}
