import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// SERVICES
import { AuthStoreService } from '@services/store/authentication/auth.service';

@Component({
	selector: 'zx-login-page',
	template: '<zx-card-login (submitForm)="login($event)"></zx-card-login>',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	constructor(protected readonly authStore: AuthStoreService) {}

	ngOnInit(): void {}

	login(loginForm: FormGroup): void {
		if (loginForm.valid) {
			const { login, password } = loginForm.value;
			this.authStore.add(login, password);
		}
	}
}
