import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

// SERVICES
import { ImageAssetsUtilsService } from '@services/utils/assets/image.service';

@Component({
	selector: 'zx-card-login',
	template: `
		<div>
			<header>
				<zx-image [src]="imageAssetsService.get('logo')" [alt]="'Zoox Logotipo'"></zx-image>
				<span>Seja Bem-vindo ao Zoox Weather</span>
			</header>

			<zx-login-form (submitForm)="submitForm.emit($event)"></zx-login-form>
		</div>
	`,
	styleUrls: ['./card-login.component.scss'],
})
export class CardLoginComponent implements OnInit {
	@Output() submitForm = new EventEmitter<FormGroup>();

	constructor(public readonly imageAssetsService: ImageAssetsUtilsService) {}

	ngOnInit(): void {}
}
