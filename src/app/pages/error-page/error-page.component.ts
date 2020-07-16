import { Component, OnInit } from '@angular/core';

// SERVICE
import { RouterUtilsService } from '@services/utils/router/router.service';

@Component({
	selector: 'zx-error-page',
	template: `
		<section>
			<span>404</span>
			<span>Esta página não existe neste Planeta!</span>

			<zx-button (click)="backToRoute()" [ngClass]="['width-15', 'margin-top-2']">Voltar</zx-button>
		</section>
	`,
	styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
	constructor(protected readonly routerService: RouterUtilsService) {}

	ngOnInit(): void {}

	backToRoute(): void {
		this.routerService.navigateTo('/');
	}
}
