import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Subscriber, BehaviorSubject, combineLatest } from 'rxjs';

// INTERFACES
import { IWorldCountry, IWorldCity } from '@store/world/world.interface';
import { ISelectOptionData } from '@shared/components/utils/select-option/select-option.component.interface';

// SERVICES
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
	countries$ = new BehaviorSubject<ISelectOptionData[] | null>(null);
	cities$ = new BehaviorSubject<ISelectOptionData[] | null>(null);
	createForm: FormGroup;

	constructor(
		protected readonly activatedRoute: ActivatedRoute,
		protected readonly routerUtils: RouterUtilsService,
		protected readonly formBuilder: FormBuilder,
		protected readonly worldStore: WorldStoreService,
		protected readonly dateUtils: DateUtilsService
	) {
		this.createForm = formBuilder.group({
			country: formBuilder.control({ value: '', disabled: true }, [Validators.minLength(2), Validators.required]),
			city: formBuilder.control({ value: '', disabled: true }, [Validators.minLength(2), Validators.required]),
		});
	}

	ngAfterContentInit(): void {
		this.subscription$ = combineLatest([this.routerUtils.routerState$, this.activatedRoute.data]).subscribe(([routerState, routerData]) => {
			const { createCountry, createCity } = routerState;
			const [_, countriesCreated, __, countriesNotCreated, citiesNotCreated] = routerData.world;

			this.subscriber$.add(this.isCreateCountryRoute$.next(routerState.createCountry));

			this.setCountriesData(createCountry, countriesCreated, countriesNotCreated);
			this.removeFormControl(createCountry);
			this.updateFormControlState(createCountry, createCity, false, countriesCreated, countriesNotCreated);
		});
	}

	ngOnInit(): void {
		this.subscription$ = combineLatest([this.isCreateCountryRoute$, this.activatedRoute.data, this.createForm.controls.country.valueChanges]).subscribe(
			([isCreateCountryRoute, routerData, countryCode]) => {
				if (countryCode) {
					const [_, countriesCreated, __, ___, citiesNotCreated] = routerData.world;

					this.updateFormControlState(isCreateCountryRoute, !isCreateCountryRoute, true, null, null, countryCode);
					this.setCitiesData(!isCreateCountryRoute, countryCode, countriesCreated, citiesNotCreated);
				}
			}
		);
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}

	/** @description Removes city control from the form, according to the route it is on. */
	protected removeFormControl(isCreateCountryRoute: boolean): void {
		if (isCreateCountryRoute) {
			this.createForm.removeControl('cities');
		}
	}

	/** @description Enables a specific control with a specific business rule. */
	protected updateFormControlState(
		isCreateCountryRoute: boolean,
		isCreateCityRoute: boolean,
		isFormValueChange: boolean,
		countriesCreated: IWorldCountry[] | null,
		countriesNotCreated: IWorldCountry[] | null,
		countryCodeSelected?: string
	): void {
		// ENABLE COUNTRIES FORM CONTROL
		if ((isCreateCountryRoute && countriesNotCreated?.length > 0) || (isCreateCityRoute && countriesCreated?.length > 0)) {
			this.createForm.controls.country.enable();
		}

		// ENABLE CITIES FORM CONTROL
		if (isCreateCityRoute && isFormValueChange && countryCodeSelected) {
			this.createForm.controls.city.enable();
		}
	}

	/** @description Insert country data coming from the backend according to the structure of the selection option component interface. */
	protected setCountriesData(isCreateCountryRoute: boolean, countriesCreated: IWorldCountry[], countriesNotCreated: IWorldCountry[]): void {
		const countryCreatedOption: ISelectOptionData[] = [];
		const countryNotCreatedOption: ISelectOptionData[] = [];

		if (!isCreateCountryRoute) {
			countriesCreated.forEach(country =>
				countryCreatedOption.push({
					item: country,
					value: country.id,
					text: country.name,
				})
			);
		} else {
			countriesNotCreated.forEach(country =>
				countryNotCreatedOption.push({
					item: country,
					value: country.id,
					text: country.name,
				})
			);
		}

		this.subscriber$.add(this.countries$.next(!this.isCreateCountryRoute$.getValue() ? countryCreatedOption : countryNotCreatedOption));
	}

	/** @description Insert city data coming from the backend according to the structure of the selection option component interface. */
	protected setCitiesData(isCreateCityRoute: boolean, countryCodeSelected: string, countriesCreated: IWorldCountry[], citiesNotCreated: IWorldCity[]): void {
		if (isCreateCityRoute) {
			const citySelectOption: ISelectOptionData[] = [];
			const countrySelected = countriesCreated.filter(country => country.id === countryCodeSelected)[0];
			const citiesByCountrySelected = citiesNotCreated.map(city => countrySelected.cities.filter(cityNotCreated => city.id === cityNotCreated.id)[0]);

			citiesByCountrySelected.forEach(city => {
				if (city) {
					citySelectOption.push({
						item: city,
						value: city.id,
						text: city.name,
					});
				}
			});

			this.subscriber$.add(this.cities$.next(!this.isCreateCountryRoute$.getValue() ? citySelectOption : null));
		}
	}

	submitForm(): void {
		if (this.createForm.valid) {
			const { country, city } = this.createForm.value;
			const countrySelected: IWorldCountry = this.countries$.getValue().filter(selectOption => selectOption.item.id === country)[0].item;

			if (!this.isCreateCountryRoute$.getValue()) {
				const citiesNotCreated: IWorldCity[] = countrySelected.cities.filter(cityData => cityData.id !== city);
				const citySelected: IWorldCity = Object.assign({}, countrySelected.cities.filter(cityData => cityData.id === city)[0]);
				citySelected.createdAt = this.dateUtils.localUTC;
				citySelected.isCreated = true;

				this.worldStore.update({
					id: country,
					changes: {
						updatedAt: this.dateUtils.localUTC,
						cities: [...citiesNotCreated, citySelected],
					},
				});
			} else {
				this.worldStore.update({
					id: country,
					changes: {
						createdAt: this.dateUtils.localUTC,
						isCreated: true,
					},
				});
			}
		}
	}
}
