import { Component, AfterContentInit, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Subscriber, BehaviorSubject, combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { IWorldCountry, IWorldCity } from '@store/world/world.interface';
import { RouterUtilsService } from '@services/utils/router/router.service';
import { WorldStoreService } from '@services/store/world/world.service';
import { DateUtilsService } from '@services/utils/date/date.service';

@Component({
	selector: 'zx-create-form',
	templateUrl: './create-form.component.html',
	styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit, AfterContentInit, OnDestroy {
	protected subscription$ = new Subscription();
	protected subscriber$ = new Subscriber();
	isCreateCountryRoute$ = new BehaviorSubject<boolean>(false);
	countryData$ = new BehaviorSubject<Array<{ value: string; text: string }> | null>(null);
	cityData$ = new BehaviorSubject<Array<{ value: string; text: string }> | null>(null);
	createForm: FormGroup;

	constructor(
		protected readonly routerUtils: RouterUtilsService,
		protected readonly formBuilder: FormBuilder,
		protected readonly worldStore: WorldStoreService,
		protected readonly dateUtils: DateUtilsService
	) {
		this.worldStore.add();
		this.createForm = this.formBuilder.group({
			country: this.formBuilder.control({ value: '', disabled: true }, [Validators.minLength(2), Validators.required]),
		});
	}

	ngOnInit(): void {
		this.subscription$ = combineLatest([this.routerUtils.routerState$, this.createForm.controls.country.valueChanges, this.worldStore.countriesCreated$])
			.pipe(takeWhile(([routerState]) => routerState.createCity))
			.subscribe(([_, countryCode, countries]) => {
				this.setListData(true, countries);

				if (countryCode) {
					this.subscription$ = this.worldStore.getCitiesNotCreated$(countryCode).subscribe(cities => {
						if (cities) {
							this.setListData(false, cities);
							this.createForm.controls.city.enable();
						}
					});
				}
			});
	}

	ngAfterContentInit(): void {
		this.subscription$ = combineLatest([this.routerUtils.routerState$, this.worldStore.countriesNotCreated$, this.worldStore.countriesCreated$])
			.pipe(takeWhile(([routerState]) => routerState.createCountry || routerState.createCity))
			.subscribe(([routerState, countriesNotCreated, countriesCreated]) => {
				this.subscriber$.add(this.isCreateCountryRoute$.next(routerState.createCountry));
				this.setListData(true, routerState.createCountry ? countriesNotCreated : countriesCreated);

				if ((routerState.createCountry && countriesNotCreated?.length > 0) || (routerState.createCity && countriesCreated?.length > 0)) {
					this.createForm.controls.country.enable();
				}

				if (routerState.createCity) {
					this.createForm.addControl('city', this.formBuilder.control({ value: '', disabled: true }, [Validators.minLength(2), Validators.required]));
				}
			});
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}

	protected setListData(isCountryForm: boolean, data: IWorldCountry[] | IWorldCity[]): void {
		if (data) {
			const dataNormalized: Array<{ value: string; text: string }> = [];
			data.forEach((item: IWorldCountry | IWorldCity) => dataNormalized.push({ value: item.id, text: item.name }));

			this.subscriber$.add(this[isCountryForm ? 'countryData$' : 'cityData$'].next(dataNormalized));
		}
	}

	protected removeItemList(isCountryForm: boolean, itemSelected: IWorldCountry | IWorldCity): void {
		const data = this[isCountryForm ? 'countryData$' : 'cityData$'].getValue();
	}

	submitForm(): void {
		if (this.createForm.valid) {
			const { country, city } = this.createForm.value;

			if (this.isCreateCountryRoute$.getValue()) {
				this.worldStore.update({
					id: country,
					changes: {
						isCreated: true,
						createdAt: this.dateUtils.localUTC,
					},
				});
			} else {
				const cities$ = new BehaviorSubject<IWorldCity[] | null>(null);
				let citiesNotSelected: IWorldCity[];
				let citySelected: IWorldCity;
				let citySelectedDraft: IWorldCity;

				this.subscription$ = this.worldStore.getCities$(country).subscribe(cities => this.subscriber$.add(cities$.next(cities)));

				citiesNotSelected = cities$.getValue().filter(ct => ct.id !== city);
				citySelected = cities$.getValue().filter(ct => ct.id === city)[0];
				citySelectedDraft = Object.assign({}, citySelected);
				citySelectedDraft.isCreated = true;
				citySelectedDraft.createdAt = this.dateUtils.localUTC;

				this.worldStore.update({
					id: country,
					changes: {
						cities: [citySelectedDraft, ...citiesNotSelected],
					},
				});
			}
		}
	}
}
