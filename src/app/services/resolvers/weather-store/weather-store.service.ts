import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// SERVICE
import { WeatherStoreService } from '@services/store/weather/weather.service';

@Injectable({
	providedIn: 'root',
})
export class WeatherStoreResolver implements Resolve<any> {
	constructor(protected readonly weatherStore: WeatherStoreService, protected readonly router: Router) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		this.weatherStore.set(this.router.getCurrentNavigation().extras.state.coordinates);

		return this.weatherStore.get$().pipe(take(2));
	}
}
