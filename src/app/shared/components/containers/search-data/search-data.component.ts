import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'zx-search-data',
	templateUrl: './search-data.component.html',
	styleUrls: ['./search-data.component.scss'],
})
export class SearchDataComponent implements OnInit, OnDestroy {
	@Output() orderBy = new EventEmitter<boolean>();
	@Input() fmGroup: FormGroup;
	@Input() fmControlName: FormControlName;
	@Input() minLength: number;
	@Input() maxLength: number;
	@Input() placeholder: string;
	protected subscription$: Subscription;
	isOrderByAsc$ = new BehaviorSubject<boolean>(true);

	constructor() {}

	ngOnInit(): void {
		// If the user has activated the ordering and type in the form, the ordering status returns to the default.
		this.subscription$ = this.fmGroup.valueChanges.pipe(filter(({ search }) => !!search)).subscribe(() => this.isOrderByAsc$.next(true));
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.isOrderByAsc$.unsubscribe();
	}

	onclickOrderBy(): void {
		this.isOrderByAsc$.next(!this.isOrderByAsc$.getValue());
		this.orderBy.emit(this.isOrderByAsc$.getValue());
	}
}
