import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { ISelectOptionItem } from '@shared/interfaces/utils.interface';

@Component({
	selector: 'zx-select-option',
	template: `
		<ng-container [formGroup]="fmGroup">
			<select
				(change)="isSelected = false"
				(focus)="isSelected = true"
				(blur)="isSelected = false"
				[formControlName]="fmControlName"
				[attr.isSelected]="isSelected"
			>
				<option [value]="''" disabled>{{ title }}</option>
				<option *ngFor="let item of list" [value]="item.value">{{ item.text }}</option>
			</select>
		</ng-container>
	`,
	styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent implements OnInit {
	@Input() fmGroup: FormGroup;
	@Input() fmControlName: FormControlName;
	@Input() title: string;
	@Input() list: ISelectOptionItem[];
	isSelected = false;

	constructor() {}

	ngOnInit(): void {}
}
