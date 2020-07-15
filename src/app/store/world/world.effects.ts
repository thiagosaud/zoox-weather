import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// STORE ITEM CONFIG
import * as action from './world.actions';
import { ZooxApiService } from '@services/APIS/server/zoox.service';

@Injectable()
export class Effects {
	constructor(protected readonly action$: Actions, protected readonly backendService: ZooxApiService) {}

	set$ = createEffect(() =>
		this.action$.pipe(
			ofType(action.SET_WORLD),
			switchMap(() => {
				return this.backendService.getWorld().pipe(
					map(world => action.SET_WORLD_SUCCESS({ world })),
					catchError((error: HttpErrorResponse) => of(action.SET_WORLD_FAIL({ error })))
				);
			})
		)
	);

	update$ = createEffect(() =>
		this.action$.pipe(
			ofType(action.UPDATE_WORLD),
			switchMap(({ updates }) => {
				return this.backendService.updateWorld(updates).pipe(
					map(() => action.UPDATE_WORLD_SUCCESS({ updates })),
					catchError((error: HttpErrorResponse) => of(action.UPDATE_WORLD_FAIL({ error })))
				);
			})
		)
	);
}
