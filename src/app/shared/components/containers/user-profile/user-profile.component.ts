import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'zx-user-profile',
	template: `
		<div>
			<zx-image [theme]="'circle-default'" [src]="imgSrc" [alt]="imgAlt"></zx-image>

			<section>
				<span>{{ fullname }}</span>
				<span>{{ email }}</span>
			</section>
		</div>
	`,
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
	@Input() fullname: string;
	@Input() email: string;
	@Input() imgSrc: string;
	@Input() imgAlt: string;

	constructor() {}

	ngOnInit(): void {}
}
