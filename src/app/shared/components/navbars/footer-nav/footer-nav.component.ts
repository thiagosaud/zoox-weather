import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-footer-nav',
	template: `
		<nav>
			<zx-footer-nav-controller [title]="'PESQUISAR'" [icon]="'search'"></zx-footer-nav-controller>
			<zx-footer-nav-controller [title]="'CRIAR'" [icon]="'add'" [isNormalOrder]="false" [isActived]="isCreateRoute"></zx-footer-nav-controller>
		</nav>
	`,
	styleUrls: ['./footer-nav.component.scss'],
})
export class FooterNavComponent implements OnInit {
	@Input() isCreateRoute: boolean;

	constructor() {}

	ngOnInit(): void {}
}
