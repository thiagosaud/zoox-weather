import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'zx-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
	searchForm: FormGroup;
	listTest$ = new BehaviorSubject<Array<{ text: string; isCountry: boolean; isClicked: boolean }> | null>([
		{
			text: 'Rio de Janeiro',
			isCountry: false,
			isClicked: false,
		},
		{
			text: 'Estados Unidos',
			isCountry: true,
			isClicked: false,
		},
		{
			text: 'Brasil',
			isCountry: true,
			isClicked: false,
		},
		{
			text: 'São Paulo',
			isCountry: false,
			isClicked: false,
		},
		{
			text: 'Nova York',
			isCountry: false,
			isClicked: false,
		},
	]);
	itemSelected: Array<{ text: string; isCountry: boolean; isClicked: boolean }> = [];

	constructor(protected readonly fb: FormBuilder) {
		this.searchForm = fb.group({
			search: fb.control('', [Validators.minLength(1), Validators.maxLength(58), Validators.required]),
		});
	}

	ngOnInit(): void {}

	/** @description Returns the number of items selected from the list. */
	get amountItemSelected(): number {
		return this.listTest$.getValue().filter(item => item.isClicked).length;
	}

	/** @description Sort the list by pressing the button of the child component, the sorting can be of two types: "Ascending" or "Descending". */
	orderByList(isOrderByAsc: boolean): void {
		this.listTest$.getValue().sort((a, b) => (isOrderByAsc ? (a.text > b.text ? 1 : -1) : b.text > a.text ? 1 : -1));
	}

	/** @description Filters the list according to the characters entered in the child component. */
	protected filterData(): void {
		this.searchForm.valueChanges
			.pipe(
				debounceTime(500),
				map(({ search }) => {
					const searchNormalized = this.normalizeFilter(search);
					const filterNormalized = this.listTest$.getValue().filter(item => this.normalizeFilter(item.text).includes(searchNormalized));

					if (filterNormalized.length === 0 || !search) {
						this.listTest$.next([
							{
								text: 'Rio de Janeiro',
								isCountry: false,
								isClicked: false,
							},
							{
								text: 'Estados Unidos',
								isCountry: true,
								isClicked: false,
							},
							{
								text: 'Brasil',
								isCountry: true,
								isClicked: false,
							},
							{
								text: 'São Paulo',
								isCountry: false,
								isClicked: false,
							},
							{
								text: 'Nova York',
								isCountry: false,
								isClicked: false,
							},
						]);

						return this.listTest$.getValue();
					}

					return filterNormalized;
				})
			)
			.subscribe(result => this.listTest$.next(result));
	}

	/** @description Normalizes the filter string, removing blank and seated characters. */
	protected normalizeFilter(text: string): string {
		return text
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f/\s]/g, '');
	}

	goToViewRoute() {}
}
