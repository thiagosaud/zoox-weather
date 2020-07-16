import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
	selector: 'zx-fieldset',
	template: `
		<fieldset [attr.theme]="theme" [class]="class">
			<span [ngClass]="spanClass">{{ title }}</span>

			<zx-input
				[fmGroup]="fmGroup"
				[fmControlName]="fmControlName"
				[ngClass]="inputClass"
				[type]="inputType"
				[minLength]="minLength"
				[maxLength]="maxLength"
			></zx-input>
		</fieldset>
	`,
	styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent implements OnInit {
	@Input() fmGroup: FormGroup;
	@Input() fmControlName: FormControlName;
	@Input() title: string;
	@Input() theme = 'default';
	@Input() class: string;
	@Input() spanClass: string;
	@Input() inputClass: string;
	@Input() inputType: string;
	@Input() minLength: number;
	@Input() maxLength: number;

	constructor() {}

	ngOnInit(): void {}
}
