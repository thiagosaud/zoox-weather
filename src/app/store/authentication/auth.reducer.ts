import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

// STORE ITEM CONFIG'S
import { IEntityState, IAuthentication } from './auth.interface';
import * as authAction from './auth.actions';

export const adapter: EntityAdapter<IAuthentication> = createEntityAdapter<IAuthentication>({
	selectId: auth => auth.token,
});

const INITIAL_STATE: IEntityState = adapter.getInitialState({
	loading: false,
	auth: null,
	error: null,
});

const stateTransition = createReducer(
	INITIAL_STATE,
	on(authAction.SET_AUTH, authAction.DELETE_AUTH, state => ({ ...state, loading: true })),
	on(authAction.SET_AUTH_SUCCESS, (state, { auth }) => adapter.addOne(auth, { ...state, auth, loading: false })),
	on(authAction.DELETE_AUTH_SUCCESS, (state, { token }) => adapter.removeOne(token, { ...state, loading: false })),
	on(authAction.SET_AUTH_FAIL, authAction.DELETE_AUTH_FAIL, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: IEntityState | undefined, action: Action) {
	return stateTransition(state, action);
}
