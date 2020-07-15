import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-button',
	template: `
		<button [attr.theme]="theme" [ngClass]="ngClass" [type]="type" [disabled]="isDisabled">
			<ng-content></ng-content>
		</button>
	`,
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	@Input() ngClass: string;
	@Input() theme = 'rounded-blue-light-shadow-small';
	@Input() type = 'button';
	@Input() isDisabled = false;

	constructor() {}

	ngOnInit(): void {}
}
