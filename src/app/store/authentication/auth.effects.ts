import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// STORE ITEM CONFIG
import * as action from './auth.actions';

// SERVICES
import { ZooxApiService } from '@services/APIS/server/zoox.service';
import { AuthUtilsService } from '@services/utils/authentication/auth.service';
import { ToastifyUtilsService } from '@services/utils/toastify/toastify.service';

@Injectable()
export class Effects {
	constructor(
		protected readonly action$: Actions,
		protected readonly backendService: ZooxApiService,
		protected readonly authService: AuthUtilsService,
		protected readonly toastifyService: ToastifyUtilsService
	) {}

	set$ = createEffect(() =>
		this.action$.pipe(
			ofType(action.SET_AUTH),
			switchMap(({ username, password }) =>
				this.backendService.getUser(username, password).pipe(
					map(user => {
						this.authService.createToken();
						this.toastifyService.success('Sucesso', 'Acesso Autorizado!');

						return action.SET_AUTH_SUCCESS({
							auth: {
								isAuthenticated: true,
								token: this.authService.token,
								user: user[0],
							},
						});
					}),
					catchError((error: HttpErrorResponse) => {
						this.toastifyService.error('Falha', 'Acesso não autorizado!');

						return of(action.SET_AUTH_FAIL({ error }));
					})
				)
			)
		)
	);

	delete$ = createEffect(() =>
		this.action$.pipe(
			ofType(action.DELETE_AUTH),
			switchMap(({ token }) => {
				if (this.authService.token) {
					this.authService.removeToken();
					this.toastifyService.success('Sucesso', 'Autenticação Removida!');

					return of(action.DELETE_AUTH_SUCCESS({ token }));
				} else {
					this.toastifyService.error('Falha', 'O Token de autenticação não existe!');

					return of(
						action.DELETE_AUTH_FAIL({
							error: {
								status: 400,
								statusText: 'Token does not exist!',
							},
						})
					);
				}
			})
		)
	);
}
