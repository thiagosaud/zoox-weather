import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'zx-footer-nav-controller',
	templateUrl: './footer-nav-controller.component.html',
	styleUrls: ['./footer-nav-controller.component.scss'],
})
export class FooterNavControllerComponent implements OnInit {
	@Output() onclick = new EventEmitter<MouseEvent>();
	@Input() title: string;
	@Input() icon: string;
	@Input() isNormalOrder = true;
	@Input() isActived = false;

	constructor() {}

	ngOnInit(): void {}
}
