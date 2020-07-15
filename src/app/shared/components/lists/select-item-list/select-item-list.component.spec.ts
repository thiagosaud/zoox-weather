import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemListComponent } from './select-item-list.component';

describe('SelectItemListComponent', () => {
	let component: SelectItemListComponent;
	let fixture: ComponentFixture<SelectItemListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SelectItemListComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectItemListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
