import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
	selector: 'zx-input',
	template: `
		<ng-container [formGroup]="fmGroup">
			<input
				[formControlName]="fmControlName"
				[attr.theme]="theme"
				[ngClass]="ngClass"
				[type]="type"
				[placeholder]="placeholder"
				[minLength]="minLength"
				[maxLength]="maxLength"
				[required]="isRequired"
				autocomplete
			/>
		</ng-container>
	`,
	styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
	@HostBinding('class') host: string;
	@Input() fmGroup: FormGroup;
	@Input() fmControlName: FormControlName;
	@Input() hostClass: string;
	@Input() ngClass: string;
	@Input() theme = 'rounded-solid-grey-light';
	@Input() type = 'text';
	@Input() placeholder = '';
	@Input() minLength = 1;
	@Input() maxLength = 524288;
	@Input() isRequired = true;

	constructor() {}

	ngOnInit(): void {
		this.host = this.hostClass;
	}
}
