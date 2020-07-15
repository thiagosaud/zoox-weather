import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-footer-nav-controller',
	template: `
		<div [attr.isNormalOrder]="isNormalOrder" [attr.isActived]="isActived">
			<span [ngStyle]="{ order: isNormalOrder ? 1 : 3 }">{{ title }}</span>
			<hr [ngStyle]="{ order: isNormalOrder ? 2 : 2 }" />
			<zx-icon [theme]="isActived ? 'light-hover' : 'dark-hover'" [ngStyle]="{ order: isNormalOrder ? 3 : 1 }" [name]="icon"></zx-icon>
		</div>
	`,
	styleUrls: ['./footer-nav-controller.component.scss'],
})
export class FooterNavControllerComponent implements OnInit {
	@Input() title: string;
	@Input() icon: string;
	@Input() isNormalOrder = true;
	@Input() isActived = false;

	constructor() {}

	ngOnInit(): void {}
}
