import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

// STORE ITEM INTERFACE
import { IAuthentication } from './auth.interface';

// SET AUTH
export const SET_AUTH = createAction('[GET/Auth]', props<{ username: string; password: string }>());
export const SET_AUTH_SUCCESS = createAction('[GET/Auth] Succeful', props<{ auth: IAuthentication }>());
export const SET_AUTH_FAIL = createAction('[GET/Auth] Unsuccessful', props<{ error: HttpErrorResponse }>());

// REMOVE AUTH
export const DELETE_AUTH = createAction('[DELETE/Auth]', props<{ token: string }>());
export const DELETE_AUTH_SUCCESS = createAction('[DELETE/Auth] Succeful', props<{ token: string }>());
export const DELETE_AUTH_FAIL = createAction('[DELETE/Auth] Unsuccessful', props<{ error: any }>());
