import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'zx-footer-nav',
	templateUrl: './footer-nav.component.html',
	styleUrls: ['./footer-nav.component.scss'],
})
export class FooterNavComponent implements OnInit {
	@Output() goToSearch = new EventEmitter<MouseEvent>();
	@Output() goToCreate = new EventEmitter<MouseEvent>();
	@Input() isCreateRoute: boolean;

	constructor() {}

	ngOnInit(): void {}
}
