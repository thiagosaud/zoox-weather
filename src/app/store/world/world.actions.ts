import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Update } from '@ngrx/entity';

// STORE ITEM INTERFACE
import { IWorldCountry } from './world.interface';

// SET WORLD DATA
export const SET_WORLD = createAction('[GET/World]');
export const SET_WORLD_SUCCESS = createAction('[GET/World] Succeful', props<{ world: IWorldCountry[] }>());
export const SET_WORLD_FAIL = createAction('[GET/World] Unsuccessful', props<{ error: HttpErrorResponse }>());

// UPDATE WORLD DATA
export const UPDATE_WORLD = createAction('[UPDATE/World]', props<{ updates: Update<IWorldCountry> }>());
export const UPDATE_WORLD_SUCCESS = createAction('[UPDATE/World] Succeful', props<{ updates: Update<IWorldCountry> }>());
export const UPDATE_WORLD_FAIL = createAction('[UPDATE/World] Unsuccessful', props<{ error: HttpErrorResponse }>());
