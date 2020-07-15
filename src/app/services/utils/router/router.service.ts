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
		switch (routerName) {
			case '/error':
				this.updateRouterState(true, false, false, false, false, false, false, false, false);
				break;
			case '/login':
				this.updateRouterState(false, true, false, false, false, false, false, false, false);
				break;
			case '/profile':
				this.updateRouterState(false, false, false, true, false, false, false, false, false);
				break;
			case '/create':
				this.updateRouterState(false, false, false, false, true, false, false, false, false);
				break;
			case '/create/country':
				this.updateRouterState(false, false, false, false, false, true, false, false, false);
				break;
			case '/create/city':
				this.updateRouterState(false, false, false, false, false, false, true, false, false);
				break;
			case '/search':
				this.updateRouterState(false, false, false, false, false, false, false, true, false);
				break;
			case '/view':
				this.updateRouterState(false, false, false, false, false, false, false, false, true);
				break;
			default:
				this.updateRouterState(false, false, true, false, false, false, false, false, false);
				break;
		}
	}

	/** @description Auxiliary method for updating route states */
	protected updateRouterState(
		error: boolean,
		login: boolean,
		home: boolean,
		profile: boolean,
		create: boolean,
		createCountry: boolean,
		createCity: boolean,
		search: boolean,
		view: boolean
	): void {
		this.routerState$.next({
			error,
			login,
			home,
			profile,
			create,
			createCountry,
			createCity,
			search,
			view,
		});
	}

	/** @description Route navigation by name */
	/** @TODO Completar o CATCH... */
	navigateTo(routerName: string, extras?: NavigationExtras): void {
		this.router.navigate([routerName], extras).catch(() => this.toastifyService.error('Error', 'Ops... Ocorreu algum problema.'));
	}
}
