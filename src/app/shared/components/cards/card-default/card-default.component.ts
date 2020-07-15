import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-card-default',
	template: `
		<div>
			<zx-image [theme]="'medium'" [src]="imgSrc" [alt]="imgAlt"></zx-image>
			<span>{{ title }}</span>
		</div>
	`,
	styleUrls: ['./card-default.component.scss'],
})
export class CardDefaultComponent implements OnInit {
	@Input() imgSrc: string;
	@Input() imgAlt: string;
	@Input() title: string;

	constructor() {}

	ngOnInit(): void {}
}
