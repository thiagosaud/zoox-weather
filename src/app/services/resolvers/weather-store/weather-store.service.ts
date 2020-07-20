import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// INTERFACE
import { IWeatherData } from '@store/weather/weather.interface';

// SERVICE
import { WeatherStoreService } from '@services/store/weather/weather.service';

@Injectable({
	providedIn: 'root',
})
export class WeatherStoreResolver implements Resolve<IWeatherData[]> {
	constructor(protected readonly weatherStore: WeatherStoreService, protected readonly router: Router) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWeatherData[]> {
		if (this.router.getCurrentNavigation().extras?.state?.coordinates) {
			this.weatherStore.set(this.router.getCurrentNavigation().extras?.state?.coordinates);

			return this.weatherStore.get$().pipe(take(2));
		} else {
			this.router.navigate(['search']);
		}
	}
}
