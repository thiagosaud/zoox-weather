import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, map, takeWhile } from 'rxjs/operators';
import { BehaviorSubject, Subscriber, Subscription, combineLatest } from 'rxjs';

// INTERFACES
import { ISelectItem } from '@shared/interfaces/utils.interface';
import { IWorldCity, IWorldCountry } from '@store/world/world.interface';

// SERVICES
import { RouterUtilsService } from '@services/utils/router/router.service';
import { WorldStoreService } from '@services/store/world/world.service';
import { DateUtilsService } from '@services/utils/date/date.service';

@Component({
	selector: 'zx-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy, AfterContentInit {
	protected subscription$ = new Subscription();
	protected subscriber$ = new Subscriber();
	cityData$ = new BehaviorSubject<ISelectItem[] | null>(null);
	citiesSelected: ISelectItem[];
	searchForm: FormGroup;

	constructor(
		protected readonly routerUtils: RouterUtilsService,
		protected readonly worldStore: WorldStoreService,
		protected readonly dateUtils: DateUtilsService,
		protected readonly formBuilder: FormBuilder
	) {
		this.worldStore.add();
		this.searchForm = formBuilder.group({
			search: formBuilder.control('', [Validators.minLength(1), Validators.maxLength(58), Validators.required]),
		});
	}

	ngOnInit(): void {
		/** @description Filters the list according to the characters entered in the child component. */
		combineLatest([this.searchForm.valueChanges, this.worldStore.citiesCreated$, this.cityData$])
			.pipe(
				takeWhile(([_, cities]) => !!cities),
				debounceTime(500),
				map(([valueChanges, cities, selectsCities]) => {
					const { search } = valueChanges;
					const searchNormalized = this.normalizeFilter(search);
					const filterNormalized = selectsCities.filter(item => this.normalizeFilter(item.cityName).includes(searchNormalized));

					return filterNormalized.length === 0 || !search ? this.normalizeData(cities) : filterNormalized;
				})
			)
			.subscribe(items => this.setData(true, null, items));
	}

	ngAfterContentInit(): void {
		this.subscription$ = this.worldStore.citiesCreated$.subscribe(cities => {
			if (cities) {
				this.setData(false, cities);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}

	/** @description Returns the number of items selected from the list. */
	get amountItemSelected(): number {
		return this.cityData$.getValue()?.filter(item => item.isClicked).length;
	}

	/** @description Auxiliary method for entering normalized values.  */
	protected setData(isDataNormalized: boolean, cities: IWorldCity[], citiesNormalized?: ISelectItem[]): void {
		if (cities || citiesNormalized) {
			this.subscriber$.add(this.cityData$.next(isDataNormalized ? citiesNormalized : this.normalizeData(cities)));
		}
	}

	/** @description Normalizes cities from storage, so they can be rendered in the list. */
	protected normalizeData(cities: IWorldCity[]): ISelectItem[] {
		const dataNormalized: ISelectItem[] = [];

		cities.forEach(city =>
			dataNormalized.push({
				cityCode: city.id,
				cityName: city.name,
				cityLat: city.lat,
				cityLon: city.lon,
				isClicked: false,
			})
		);

		return dataNormalized;
	}

	/** @description Normalizes the filter string, removing blank and seated characters. */
	protected normalizeFilter(text: string): string {
		return text
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f/\s]/g, '');
	}

	/** @description Sort the list by pressing the button of the child component, the sorting can be of two types: "Ascending" or "Descending". */
	orderByList(isOrderByAsc: boolean): void {
		this.cityData$.getValue()?.sort((a, b) => (isOrderByAsc ? (a.cityName > b.cityName ? 1 : -1) : b.cityName > a.cityName ? 1 : -1));
	}

	goToViewRoute() {
		if (this.citiesSelected.length >= 1 && this.citiesSelected.length <= 3) {
			let stringParams = '';

			this.citiesSelected.forEach(city => (stringParams += `${city.cityCode} `));
			this.routerUtils.navigateTo('/view', {
				queryParams: {
					cities: stringParams.match(/[^ ,]+/g).join(','),
				},
			});
		}
	}

	deleteCity(item: ISelectItem): void {
		if (item) {
			console.log('aquii');
			const country$ = new BehaviorSubject<IWorldCountry | null>(null);

			this.subscription$ = this.worldStore.getCountryByCityId$(item.cityCode).subscribe(country => this.subscriber$.add(country$.next(country)));

			if (country$.getValue()) {
				this.worldStore.update({
					id: country$.getValue()?.id,
					changes: {
						updatedAt: this.dateUtils.localUTC,
						cities: [...country$.getValue()?.cities.filter(city => city.id !== item.cityCode)],
					},
				});
			}
		}
	}
}
