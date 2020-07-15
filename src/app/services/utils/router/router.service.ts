import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RouterUtilsService {
	routerState$ = new BehaviorSubject({
		home: false,
		profile: false,
		create: false,
		createCountry: false,
		createCity: false,
		search: false,
		view: false,
	});

	constructor(protected readonly router: Router) {
		router.events.subscribe(evt => {
			if (evt instanceof NavigationEnd) {
				this.setRouteStateConfig(evt.url);
			}
		});
	}

	/** @description Updates the state of the routes. */
	protected setRouteStateConfig(routerName: string): void {
		switch (routerName) {
			case '/profile':
				this.updateRouterState(false, true, false, false, false, false, false);
				break;
			case '/create':
				this.updateRouterState(false, false, true, false, false, false, false);
				break;
			case '/create/country':
				this.updateRouterState(false, false, false, true, false, false, false);
				break;
			case '/create/city':
				this.updateRouterState(false, false, false, false, true, false, false);
				break;
			case '/search':
				this.updateRouterState(false, false, false, false, false, true, false);
				break;
			case '/view':
				this.updateRouterState(false, false, false, false, false, false, true);
				break;
			default:
				this.updateRouterState(true, false, false, false, false, false, false);
				break;
		}
	}

	/** @description Auxiliary method for updating route states */
	protected updateRouterState(
		home: boolean,
		profile: boolean,
		create: boolean,
		createCountry: boolean,
		createCity: boolean,
		search: boolean,
		view: boolean
	): void {
		this.routerState$.next({
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
	navigateTo(routerName: string): void {
		this.router.navigate([routerName]).catch(response => console.log(response));
	}
}
