import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
	selector: 'zx-search-data',
	templateUrl: './search-data.component.html',
	styleUrls: ['./search-data.component.scss'],
})
export class SearchDataComponent implements OnInit {
	@Output() orderBy = new EventEmitter<boolean>();
	@Input() fmGroup: FormGroup;
	@Input() fmControlName: FormControlName;
	@Input() minLength: number;
	@Input() maxLength: number;
	@Input() placeholder: string;
	isOrderByAsc = true;

	constructor() {}

	ngOnInit(): void {}

	onclickOrderBy(): void {
		this.isOrderByAsc = !this.isOrderByAsc;
		this.orderBy.emit(this.isOrderByAsc);
	}
}
