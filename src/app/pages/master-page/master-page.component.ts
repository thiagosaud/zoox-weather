import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject, Subscriber } from 'rxjs';

// SERVICE
import { RouterUtilsService } from '@services/utils/router/router.service';

@Component({
	selector: 'zx-master-page',
	templateUrl: './master-page.component.html',
	styleUrls: ['./master-page.component.scss'],
})
export class MasterPageComponent implements OnInit, OnDestroy {
	protected subscription$ = new Subscription();
	protected subscriber$ = new Subscriber();
	pageTitle$ = new BehaviorSubject<string>('');
	backRoute$ = new BehaviorSubject<string>('');
	isHomeRoute$ = new BehaviorSubject<boolean>(false);
	isProfileRoute$ = new BehaviorSubject<boolean>(false);
	isCreateRoute$ = new BehaviorSubject<boolean>(false);
	isAbsoluteRoute$ = new BehaviorSubject<boolean>(false);

	constructor(public readonly routerUtils: RouterUtilsService) {
		this.subscription$ = this.routerUtils.routerState$.subscribe(state => {
			this.setTitlePage(state.home, state.profile, state.search, state.view, state.create, state.createCountry, state.createCity);
			this.setBackRoute(state.profile, state.search, state.view, state.create, state.createCountry, state.createCity);

			this.subscriber$.add(this.isHomeRoute$.next(state.home));
			this.subscriber$.add(this.isProfileRoute$.next(state.profile));
			this.subscriber$.add(this.isCreateRoute$.next(state.create || state.createCountry || state.createCity));
			this.subscriber$.add(this.isAbsoluteRoute$.next(state.view || state.createCountry || state.createCity));
		});
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}

	protected setTitlePage(
		isHomeRoute: boolean,
		isProfileRoute: boolean,
		isSearchRoute: boolean,
		isViewRoute: boolean,
		isCreateRoute: boolean,
		isCreateCountryRoute: boolean,
		isCreateCityRoute: boolean
	): void {
		if (isHomeRoute) {
			this.subscriber$.add(this.pageTitle$.next('Zoox Weather'));
		} else if (isProfileRoute) {
			this.subscriber$.add(this.pageTitle$.next('Perfil'));
		} else if (isSearchRoute) {
			this.subscriber$.add(this.pageTitle$.next('Procurar no Planeta'));
		} else if (isViewRoute) {
			this.subscriber$.add(this.pageTitle$.next('Clima Tempo'));
		} else if (isCreateRoute) {
			this.subscriber$.add(this.pageTitle$.next('Criar Países ou Cidades'));
		} else if (isCreateCountryRoute) {
			this.subscriber$.add(this.pageTitle$.next('Criar País'));
		} else if (isCreateCityRoute) {
			this.subscriber$.add(this.pageTitle$.next('Criar Cidade'));
		}
	}

	protected setBackRoute(
		isSearchRoute: boolean,
		isProfileRoute: boolean,
		isViewRoute: boolean,
		isCreateRoute: boolean,
		isCreateCountryRoute: boolean,
		isCreateCityRoute: boolean
	): void {
		if (isProfileRoute || isSearchRoute || isCreateRoute) {
			this.subscriber$.add(this.backRoute$.next('/'));
		} else if (isCreateCountryRoute || isCreateCityRoute) {
			this.subscriber$.add(this.backRoute$.next('/create'));
		} else if (isViewRoute) {
			this.subscriber$.add(this.backRoute$.next('/search'));
		}
	}
}
