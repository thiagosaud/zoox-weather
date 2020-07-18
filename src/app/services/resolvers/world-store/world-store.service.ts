import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

// SERVICE
import { WorldStoreService } from '@services/store/world/world.service';

@Injectable({
	providedIn: 'root',
})
export class WorldStoreResolver implements Resolve<any> {
	constructor(protected readonly worldStore: WorldStoreService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		this.worldStore.set();

		return combineLatest([
			this.worldStore.countries$,
			this.worldStore.countriesCreated$,
			this.worldStore.citiesCreated$,
			this.worldStore.countriesNotCreated$,
			this.worldStore.citiesNotCreated$,
		]).pipe(take(6));
	}
}
