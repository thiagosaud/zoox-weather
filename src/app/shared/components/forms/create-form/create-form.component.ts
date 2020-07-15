import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Subscriber, BehaviorSubject, combineLatest } from 'rxjs';
import { RouterUtilsService } from '@services/utils/router/router.service';
import { WorldStoreService } from '@services/store/world/world.service';
import { takeWhile } from 'rxjs/operators';

@Component({
	selector: 'zx-create-form',
	templateUrl: './create-form.component.html',
	styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements AfterContentInit, OnDestroy {
	protected subscription$ = new Subscription();
	protected subscriber$ = new Subscriber<boolean | BehaviorSubject<Array<{ value: string; text: string }> | null>>();
	isCreateCountryRoute$ = new BehaviorSubject<boolean>(false);
	countryData$ = new BehaviorSubject<Array<{ value: string; text: string }> | null>(null);
	cityData$ = new BehaviorSubject<Array<{ value: string; text: string }> | null>(null);
	createForm: FormGroup;

	constructor(
		protected readonly routerUtils: RouterUtilsService,
		protected readonly formBuilder: FormBuilder,
		protected readonly worldStore: WorldStoreService
	) {
		this.subscription$ = this.routerUtils.routerState$.subscribe(state => {
			this.subscriber$.add(this.isCreateCountryRoute$.next(state.createCountry));
			this.createFormGroup(state.createCity);
			this.setCountryData(state.createCity);
		});
	}

	ngAfterContentInit(): void {
		this.worldStore.add();
		this.setCountryFormConfig();
		this.setCityFormConfig();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}

	protected createFormGroup(isCreateCityRoute: boolean): void {
		this.createForm = this.formBuilder.group({
			country: this.formBuilder.control('', [Validators.required]),
		});

		if (isCreateCityRoute) {
			this.createForm.addControl('city', this.formBuilder.control('', [Validators.required]));
		}
	}

	protected setCountryFormConfig(): void {
		this.subscription$ = combineLatest([this.isCreateCountryRoute$, this.countryData$])
			.pipe(takeWhile(([isCreateCountryRoute]) => !!isCreateCountryRoute))
			.subscribe(([_, countryData]) => this.createForm.controls.country[countryData && countryData.length > 0 ? 'enable' : 'disable']());
	}

	protected setCityFormConfig(): void {
		if (this.createForm.controls.city) {
			this.createForm.controls.city.disable();

			this.subscription$ = this.createForm.controls.country.valueChanges.subscribe(countryCode => {
				this.createForm.controls.city.enable();
				this.setCityData(countryCode);
			});
		}
	}

	protected setCountryData(isCreateCityRoute: boolean): void {
		this.subscription$ = combineLatest([this.worldStore.countriesNotCreated$, this.worldStore.countriesCreated$]).subscribe(
			([countriesNotCreated, countriesCreated]) => {
				const countrySelectOption: Array<{ value: string; text: string }> = [];

				if (countriesNotCreated && countriesCreated) {
					if (isCreateCityRoute) {
						countriesCreated.forEach(country => countrySelectOption.push({ value: country.id, text: country.name }));
						this.subscriber$.add(this.countryData$.next(countrySelectOption));
					} else {
						countriesNotCreated.forEach(country => countrySelectOption.push({ value: country.id, text: country.name }));
						this.subscriber$.add(this.countryData$.next(countrySelectOption));
					}
				}
			}
		);
	}

	protected setCityData(countryCode: string): void {
		this.subscription$ = this.worldStore.getCitiesNotCreated$(countryCode).subscribe(cities => {
			const citySelectOption: Array<{ value: string; text: string }> = [];

			cities.forEach(city => citySelectOption.push({ value: city.id, text: city.name }));
			this.subscriber$.add(this.cityData$.next(citySelectOption));
		});
	}

	submitForm(): void {
		if (this.createForm.valid) {
			const { country, city } = this.createForm.value;

			if (this.isCreateCountryRoute$.getValue()) {
				this.worldStore.update({
					id: country,
					changes: {
						isCreated: true,
					},
				});
			} else {
				const cities$ = new BehaviorSubject(null);
				this.subscription$ = this.worldStore.getCities$(country).subscribe(cities => this.subscriber$.add(cities$.next(cities)));

				const newCity = { ...cities$.getValue().filter(ct => ct.id === city)[0] };
				newCity.isCreated = true;

				this.worldStore.update({
					id: country,
					changes: {
						cities: [newCity, ...cities$.getValue().filter(ct => ct.id !== city)],
					},
				});
			}
		}
	}
}
