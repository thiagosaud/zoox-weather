import { EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

// STORE ITEM INTERFACES
export interface IEntityState extends EntityState<IWorldCountry> {
	loading: boolean;
	world: IWorldCountry[] | null;
	error: HttpErrorResponse | null;
}

export interface IWorldCountry {
	id: string;
	name: string;
	capital: string;
	emoji: string;
	createdAt: string;
	updatedAt: string;
	isCreated: boolean;
	cities: IWorldCity[];
}

export interface IWorldCity {
	id: string;
	name: string;
	lat: string;
	lon: string;
	population: number;
	createdAt: string;
	isCreated: boolean;
}
