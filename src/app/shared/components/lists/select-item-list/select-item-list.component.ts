import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'zx-select-item-list',
	templateUrl: './select-item-list.component.html',
	styleUrls: ['./select-item-list.component.scss'],
})
export class SelectItemListComponent implements OnInit {
	@Output() selectItem = new EventEmitter<Array<{ text: string; isCountry: boolean; isClicked: boolean }>>();
	@Output() deleteItem = new EventEmitter<{ text: string; isCountry: boolean; isClicked: boolean }>();
	@Input() list: Array<{ text: string; isCountry: boolean; isClicked: boolean }>;
	@Input() maxSelection: number;

	constructor() {}

	ngOnInit(): void {}

	/** @description Filters only selected items, to return in the event of selection. */
	protected get itensSelected(): Array<{ text: string; isCountry: boolean; isClicked: boolean }> {
		return this.list.filter(item => item.isClicked);
	}

	/** @description Returns the number of items in the list selected. */
	protected get amountItemSelected(): number {
		return this.itensSelected.length;
	}

	/** @description Emits the selected item. */
	onSelectItem(item: { text: string; isCountry: boolean; isClicked: boolean }): void {
		this.setItemSelectedConfig(item);
		this.selectItem.emit(this.itensSelected);
	}

	/** @description Insert the configuration for selecting, deselecting the list item and blocking the number of selected items. */
	protected setItemSelectedConfig(item: { text: string; isCountry: boolean; isClicked: boolean }): void {
		if (item.isClicked) {
			item.isClicked = false;
		} else {
			if (this.amountItemSelected < this.maxSelection) {
				item.isClicked = true;
			}
		}
	}
}
