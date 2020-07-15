import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// STORE ITEM CONFIG
import * as action from './world.actions';
import { ZooxApiService } from '@services/APIS/server/zoox.service';
import { ToastifyUtilsService } from '@services/utils/toastify/toastify.service';

@Injectable()
export class Effects {
	constructor(
		protected readonly action$: Actions,
		protected readonly backendService: ZooxApiService,
		protected readonly toastifyService: ToastifyUtilsService
	) {}

	set$ = createEffect(() =>
		this.action$.pipe(
			ofType(action.SET_WORLD),
			switchMap(() => {
				return this.backendService.getWorld().pipe(
					map(world => {
						this.toastifyService.success('Sucesso', 'Dados do Planeta Carregados!');

						return action.SET_WORLD_SUCCESS({ world });
					}),
					catchError((error: HttpErrorResponse) => {
						this.toastifyService.error('Falha', 'Ops... Algo aconteceu de errado!');

						return of(action.SET_WORLD_FAIL({ error }));
					})
				);
			})
		)
	);

	update$ = createEffect(() =>
		this.action$.pipe(
			ofType(action.UPDATE_WORLD),
			switchMap(({ updates }) => {
				return this.backendService.updateWorld(updates).pipe(
					map(() => {
						this.toastifyService.success('Sucesso', 'Dados Criados!');

						return action.UPDATE_WORLD_SUCCESS({ updates });
					}),
					catchError((error: HttpErrorResponse) => {
						this.toastifyService.error('Falha', 'Ops... Algo aconteceu de errado!');

						return of(action.UPDATE_WORLD_FAIL({ error }));
					})
				);
			})
		)
	);
}
