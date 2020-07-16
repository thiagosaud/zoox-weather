import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastifyUtilsService } from '../toastify/toastify.service';

@Injectable({
	providedIn: 'root',
})
export class RouterUtilsService {
	routerState$ = new BehaviorSubject({
		error: false,
		login: false,
		home: false,
		profile: false,
		create: false,
		createCountry: false,
		createCity: false,
		search: false,
		view: false,
	});

	constructor(protected readonly router: Router, protected readonly toastifyService: ToastifyUtilsService) {
		router.events.subscribe(evt => {
			if (evt instanceof NavigationEnd) {
				this.setRouteStateConfig(evt.url);
			}
		});
	}

	/** @description Updates the state of the routes. */
	protected setRouteStateConfig(routerName: string): void {
		console.log(routerName);
		const isErrorRoute = !!routerName.includes('/error');
		const isLoginRoute = !!routerName.includes('/login');
		const isProfileRoute = !!routerName.includes('/profile');
		const isSearchRoute = !!routerName.includes('/search');
		const isViewRoute = !!routerName.includes('/view');
		const isCreateCountryRoute = !!routerName.includes('/create/country');
		const isCreateCityRoute = !!routerName.includes('/create/city');
		const isCreateRoute = !!routerName.includes('/create') && !isCreateCountryRoute && !isCreateCityRoute;
		const isHomeRoute =
			!isErrorRoute && !isLoginRoute && !isProfileRoute && !isSearchRoute && !isViewRoute && !isCreateRoute && !isCreateCountryRoute && !isCreateCityRoute;

		this.updateRouterState(
			isErrorRoute,
			isLoginRoute,
			isHomeRoute,
			isProfileRoute,
			isSearchRoute,
			isViewRoute,
			isCreateRoute,
			isCreateCountryRoute,
			isCreateCityRoute
		);
	}

	/** @description Auxiliary method for updating route states */
	protected updateRouterState(
		error: boolean,
		login: boolean,
		home: boolean,
		profile: boolean,
		search: boolean,
		view: boolean,
		create: boolean,
		createCountry: boolean,
		createCity: boolean
	): void {
		this.routerState$.next({
			error,
			login,
			home,
			profile,
			search,
			view,
			create,
			createCountry,
			createCity,
		});
	}

	/** @description Route navigation by name */
	/** @TODO Completar o CATCH... */
	navigateTo(routerName: string, extras?: NavigationExtras): void {
		this.router.navigate([routerName], extras).catch(() => this.toastifyService.error('Error', 'Ops... Ocorreu algum problema.'));
	}
}
