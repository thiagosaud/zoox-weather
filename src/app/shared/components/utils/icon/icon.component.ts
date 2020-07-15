import { Component, AfterContentInit, Input } from '@angular/core';

@Component({
	selector: 'zx-icon',
	template: `<span [ngClass]="ngClass" [class]="'icon-' + name" [attr.theme]="theme" [attr.cursor]="enableCursor"></span>`,
	styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements AfterContentInit {
	@Input() ngClass: string;
	@Input() theme = 'light-hover';
	@Input() name: string;
	@Input() enableCursor = true;

	constructor() {}

	ngAfterContentInit(): void {
		switch (this.name) {
			case 'add':
			case 'arrow-back':
			case 'close':
			case 'checkmark':
			case 'compass':
			case 'earth':
			case 'information-1':
			case 'information-2':
			case 'magic-wand':
			case 'menu':
			case 'sort-alpha-asc':
			case 'sort-alpha-desc':
			case 'search':
			case 'trash':
			case 'warning':
				break;
			default:
				throw new Error('This icon does not exist!');
		}
	}
}
