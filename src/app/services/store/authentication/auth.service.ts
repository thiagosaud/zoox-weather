import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// STORE ITEM CONFIG
import IStoreState from '@store/store.interface';
import { IAuthentication, IUserAuthentication } from '@store/authentication/auth.interface';
import * as action from '@store/authentication/auth.actions';
import * as selector from '@store/authentication/auth.selectors';

@Injectable({
	providedIn: 'root',
})
export class AuthStoreService {
	constructor(protected readonly store: Store<IStoreState>) {}

	add(username: string, password: string): void {
		this.store.dispatch(action.SET_AUTH({ username, password }));
	}

	delete(token: string): void {
		this.store.dispatch(action.DELETE_AUTH({ token }));
	}

	get$(): Observable<IAuthentication | null> {
		return this.store.pipe(select(selector.getAuth));
	}

	getUser$(): Observable<IUserAuthentication | null> {
		return this.store.pipe(select(selector.getUserAuth));
	}
}
