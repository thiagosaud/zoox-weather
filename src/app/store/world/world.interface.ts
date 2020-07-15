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
	isCreated: boolean;
	createdAt: string;
	cities: IWorldCity[];
}

export interface IWorldCity {
	id: string;
	name: string;
	lat: number;
	lon: number;
	population: number;
	isCreated: boolean;
	isClicked: boolean;
	createdAt: string;
}
