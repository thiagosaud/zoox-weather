import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemNavComponent } from './select-item-nav.component';

describe('SelectItemNavComponent', () => {
	let component: SelectItemNavComponent;
	let fixture: ComponentFixture<SelectItemNavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SelectItemNavComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectItemNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
