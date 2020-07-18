import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map, takeWhile, filter } from 'rxjs/operators';
import { BehaviorSubject, Subscriber, Subscription, combineLatest } from 'rxjs';

// INTERFACES
import { IWorldCountry, IWorldCity } from '@store/world/world.interface';
import { IWeatherCoordinatesCity } from '@store/weather/weather.interface';
import { ISelectItemData } from '@shared/components/lists/select-item-list/select-item-list.component.interface';

// SERVICES
import { RouterUtilsService } from '@services/utils/router/router.service';
import { WorldStoreService } from '@services/store/world/world.service';
import { DateUtilsService } from '@services/utils/date/date.service';

@Component({
	selector: 'zx-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
	protected subscription$: Subscription;
	protected subscriber$ = new Subscriber<IWorldCountry[] | null>();
	countries$ = new BehaviorSubject<IWorldCountry[] | null>(null);
	cities$ = new BehaviorSubject<IWorldCity[] | null>(null);
	selectData$ = new BehaviorSubject<ISelectItemData[] | null>(null);
	searchForm: FormGroup;

	constructor(
		protected readonly activatedRoute: ActivatedRoute,
		protected readonly routerUtils: RouterUtilsService,
		protected readonly formBuilder: FormBuilder,
		protected readonly worldStore: WorldStoreService,
		protected readonly dateUtils: DateUtilsService
	) {
		this.searchForm = formBuilder.group({
			search: formBuilder.control('', [Validators.minLength(1), Validators.maxLength(58), Validators.required]),
		});
	}

	ngOnInit(): void {
		this.subscription$ = this.activatedRoute.data.subscribe(({ world }) => {
			const countriesCreated = world[1];
			const citiesCreated: IWorldCity[] = world[2];

			this.subscriber$.add(this.countries$.next(countriesCreated));
			this.subscriber$.add(this.cities$.next(citiesCreated));
			this.setSelectData(citiesCreated);
			this.filter();
		});
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}

	/** @description Insert data coming from the backend according to the structure of the selection component interface. */
	protected setSelectData(cities: IWorldCity[]): void {
		const selectData: ISelectItemData[] = [];

		cities.forEach(city =>
			selectData.push({
				item: city,
				text: city.name,
				isSelected: false,
			})
		);

		this.subscriber$.add(this.selectData$.next(selectData));
	}

	/** @description Filters cities according to the values ​​entered in the input. */
	protected filter(): void {
		this.subscription$ = combineLatest([this.searchForm.valueChanges, this.cities$, this.activatedRoute.data])
			.pipe(
				takeWhile(([_, cities]) => cities.length > 0),
				filter(([_, cities]) => !!cities || cities.length > 0),
				debounceTime(300),
				map(([formValue, cities, dataRoute]) => {
					const resolverCities: IWorldCity[] = dataRoute.world[2];
					const dataFiltred = cities.filter(city =>
						city.name
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f/\s]/g, '')
							.includes(
								formValue.search
									.toLowerCase()
									.normalize('NFD')
									.replace(/[\u0300-\u036f/\s]/g, '')
							)
					);

					return !dataFiltred || dataFiltred.length === 0 ? resolverCities : dataFiltred;
				})
			)
			.subscribe((dataFiltred: IWorldCity[]) => this.setSelectData(dataFiltred));
	}

	/** @description Returns the number of items selected in the list. */
	get amountSelected(): number {
		return this.selectData$.getValue().filter(item => item.isSelected).length;
	}

	/** @description Updates the values ​​according to the event in the selection component. */
	updateSelectData(item: ISelectItemData): void {
		this.selectData$.getValue().map(data => (data.text === item.text ? (data = item) : data));
	}

	/** @description Sort the list by pressing the button of the child component, the sorting can be of two types: "Ascending" or "Descending". */
	orderByList(isOrderByAsc: boolean): void {
		this.selectData$.getValue()?.sort((a, b) => (isOrderByAsc ? (a.text > b.text ? 1 : -1) : b.text > a.text ? 1 : -1));
	}

	goToViewRoute() {
		if (this.amountSelected >= 1 && this.amountSelected <= 3) {
			const citiesCoordinates: IWeatherCoordinatesCity[] = [];

			this.selectData$.getValue().forEach(data => {
				if (data.isSelected) {
					citiesCoordinates.push({ lat: data.item.lat, lon: data.item.lon });
				}
			});

			this.routerUtils.navigateTo('/view', {
				state: {
					coordinates: citiesCoordinates,
				},
			});
		}
	}

	deleteCity(itemSelected: ISelectItemData): void {
		const citySelected: IWorldCity = itemSelected.item;

		if (citySelected) {
			let countryFiltred: IWorldCountry;

			this.countries$.getValue().forEach(country =>
				country.cities.filter(city => {
					if (city.id === citySelected.id) {
						countryFiltred = country;
					}
				})
			);

			if (countryFiltred) {
				this.worldStore.update({
					id: countryFiltred.id,
					changes: {
						updatedAt: this.dateUtils.localUTC,
						cities: [...countryFiltred.cities.filter(city => city.id !== citySelected.id)],
					},
				});
			}
		}
	}
}
