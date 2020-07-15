import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'zx-select-item-nav',
	template: `
		<nav>
			<span>{{ amountItens }}/3 Items selecionados</span>
			<zx-button (click)="toview.emit($event)" [isDisabled]="amountItens === 0">Visualizar</zx-button>
		</nav>
	`,
	styleUrls: ['./select-item-nav.component.scss'],
})
export class SelectItemNavComponent implements OnInit {
	@Output() toview = new EventEmitter<MouseEvent>();
	@Input() amountItens: number;

	constructor() {}

	ngOnInit(): void {}
}
