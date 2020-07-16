import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ISelectItem } from '@shared/interfaces/utils.interface';

@Component({
	selector: 'zx-select-item-list',
	templateUrl: './select-item-list.component.html',
	styleUrls: ['./select-item-list.component.scss'],
})
export class SelectItemListComponent implements OnInit {
	@Output() selectItem = new EventEmitter<ISelectItem[]>();
	@Output() deleteItem = new EventEmitter<ISelectItem>();
	@Input() list: ISelectItem[];
	@Input() maxSelection: number;

	constructor() {}

	ngOnInit(): void {}

	/** @description Filters only selected items, to return in the event of selection. */
	protected get itensSelected(): ISelectItem[] {
		return this.list.filter(item => item.isClicked);
	}

	/** @description Returns the number of items in the list selected. */
	protected get amountItemSelected(): number {
		return this.itensSelected.length;
	}

	/** @description Emits the selected item. */
	onSelectItem(item: ISelectItem): void {
		this.setItemSelectedConfig(item);
		this.selectItem.emit(this.itensSelected);
	}

	/** @description Insert the configuration for selecting, deselecting the list item and blocking the number of selected items. */
	protected setItemSelectedConfig(item: ISelectItem): void {
		if (item.isClicked) {
			item.isClicked = false;
		} else {
			if (this.amountItemSelected < this.maxSelection) {
				item.isClicked = true;
			}
		}
	}
}
