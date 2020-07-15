import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'zx-header-nav',
	templateUrl: './header-nav.component.html',
	styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
	@Output() goToHome = new EventEmitter<MouseEvent>();
	@Output() goToProfile = new EventEmitter<MouseEvent>();
	@Output() backToRoute = new EventEmitter<MouseEvent>();
	@Input() title: string;
	@Input() isHomeRoute: number;
	@Input() isProfileRoute: number;
	@Input() isAbsoluteRoute: number;

	constructor() {}

	ngOnInit(): void {}
}
