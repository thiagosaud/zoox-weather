import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

// INTERFACE
import { ISelectOptionData } from './select-option.component.interface';

@Component({
	selector: 'zx-select-option',
	template: `
		<ng-container [formGroup]="fmGroup">
			<select
				(click)="onclick.emit($event)"
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
	@Output() onclick = new EventEmitter<MouseEvent>();
	@Input() fmGroup: FormGroup;
	@Input() fmControlName: FormControlName;
	@Input() title: string;
	@Input() list: ISelectOptionData[];
	isSelected = false;

	constructor() {}

	ngOnInit(): void {}
}
