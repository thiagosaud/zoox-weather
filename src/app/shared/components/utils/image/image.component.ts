import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-image',
	template: `
		<div>
			<img [attr.theme]="theme" [ngClass]="ngClass" [src]="src" [alt]="alt" />
		</div>
	`,
	styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
	@Input() theme = 'default';
	@Input() ngClass: string;
	@Input() src: string;
	@Input() alt: string;

	constructor() {}

	ngOnInit(): void {}
}
