import { EntityState } from '@ngrx/entity';

// STORE ITEM INTERFACES
export interface IEntityState extends EntityState<IAuthentication> {
	loading: boolean;
	auth: IAuthentication | null;
	error: any | null;
}

export interface IAuthentication {
	isAuthenticated: boolean;
	token: string;
	user: IUserAuthentication | null;
}

export interface IUserAuthentication {
	id: string;
	username: string;
	password: string;
	avatar: string;
}
