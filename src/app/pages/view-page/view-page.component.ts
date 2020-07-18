import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';

// INTERFACE
import { IWeatherData } from '@store/weather/weather.interface';

@Component({
	selector: 'zx-view-page',
	template: `
		<section>
			<zx-card-weather *ngFor="let weather of weatherList$ | async" [data]="weather"></zx-card-weather>
		</section>
	`,
	styleUrls: ['./view-page.component.scss'],
})
export class ViewPageComponent implements OnInit, OnDestroy {
	protected subscription$ = new Subscription();
	weatherList$ = new BehaviorSubject<IWeatherData[] | null>(null);

	constructor(protected readonly activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.subscription$ = this.activatedRoute.data.subscribe(({ weather }) => this.weatherList$.next(weather));
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.weatherList$.unsubscribe();
	}
}
