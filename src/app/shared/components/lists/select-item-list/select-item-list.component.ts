import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

// INTERFACE
import { ISelectItemData } from './select-item-list.component.interface';

@Component({
	selector: 'zx-select-item-list',
	templateUrl: './select-item-list.component.html',
	styleUrls: ['./select-item-list.component.scss'],
})
export class SelectItemListComponent implements OnInit {
	@Output() getItemSelected = new EventEmitter<ISelectItemData>();
	@Output() deleteItem = new EventEmitter<ISelectItemData>();
	@Input() list: ISelectItemData[];
	@Input() maxAmountSelect: number;
	@Input() amountSelected: number;

	constructor() {}

	ngOnInit(): void {}

	sendItem(item: ISelectItemData): void {
		this.getItemSelected.emit(this.getItemUpdated(item));
	}

	/** @description Updates the state of the item according to the maximum selection limit. */
	protected getItemUpdated(item: ISelectItemData): ISelectItemData {
		if (this.amountSelected < this.maxAmountSelect) {
			item.isSelected = !item.isSelected;
		} else {
			item.isSelected = false;
		}

		return item;
	}
}
