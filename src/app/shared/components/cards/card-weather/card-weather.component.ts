import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// INTERFACE
import { IWeatherData, IWeatherCondition } from '@app/store/weather/weather.interface';

// SERVICE
import { DateUtilsService } from '@services/utils/date/date.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
	selector: 'zx-card-weather',
	templateUrl: './card-weather.component.html',
	styleUrls: ['./card-weather.component.scss'],
})
export class CardWeatherComponent implements OnInit, OnDestroy {
	@Input() data: IWeatherData;
	conditionList$ = new BehaviorSubject<IWeatherCondition[] | null>(null);

	constructor(protected readonly dateUtils: DateUtilsService) {}

	get conditionSelected(): IWeatherCondition {
		return this.conditionList$.getValue()?.filter(condition => condition.isSelected)[0];
	}

	ngOnInit(): void {
		this.normalizeData();
	}

	ngOnDestroy(): void {
		this.conditionList$.unsubscribe();
	}

	protected normalizeData(): void {
		const { currentDay, previousFiveDays, nextFiveDays } = this.data;
		const conditions: IWeatherCondition[] = [];

		previousFiveDays.hourly.forEach(hl => {
			conditions.push({
				dt: this.dateUtils.formatUnix(hl.dt),
				isSelected: false,
				weather: {
					description: hl.weather[0].description,
					icon: hl.weather[0].icon,
					temp: hl.temp,
					humidity: hl.humidity,
					pressure: hl.pressure,
					windSpeed: hl.wind_speed,
				},
			});
		});

		conditions.push({
			dt: currentDay.dt_txt,
			isSelected: true,
			weather: {
				description: currentDay.weather[0].description,
				icon: currentDay.weather[0].icon,
				temp_min: currentDay.main.temp_min,
				temp_max: currentDay.main.temp_max,
				humidity: currentDay.main.humidity,
				pressure: currentDay.main.pressure,
				windSpeed: currentDay.wind.speed,
			},
		});

		nextFiveDays.list.forEach(condition => {
			conditions.push({
				dt: this.dateUtils.formatUnix(condition.dt),
				isSelected: false,
				weather: {
					description: condition.weather[0].description,
					icon: condition.weather[0].icon,
					temp_min: condition.main.temp_min,
					temp_max: condition.main.temp_max,
					humidity: condition.main.humidity,
					pressure: condition.main.pressure,
					windSpeed: condition.wind.speed,
				},
			});
		});

		this.conditionList$.next(conditions);
	}

	updateListState(condition: IWeatherCondition): void {
		if (this.conditionList$.getValue()) {
			const conditions: IWeatherCondition[] = [];

			this.conditionList$.getValue().forEach(cd => {
				if (cd.dt === condition.dt) {
					conditions.push({
						...cd,
						isSelected: true,
					});
				} else {
					conditions.push({
						...cd,
						isSelected: false,
					});
				}
			});

			this.conditionList$.next(conditions);
		}
	}
}
