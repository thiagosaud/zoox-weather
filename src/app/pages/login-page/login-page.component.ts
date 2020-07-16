import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// SERVICES
import { AuthUtilsService } from '@services/utils/authentication/auth.service';
import { AuthStoreService } from '@services/store/authentication/auth.service';

@Component({
	selector: 'zx-login-page',
	template: '<zx-card-login (submitForm)="login($event)"></zx-card-login>',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	constructor(protected readonly authService: AuthUtilsService, protected readonly authStore: AuthStoreService) {}

	ngOnInit(): void {
		this.authService.removeToken();
	}

	login(loginForm: FormGroup): void {
		if (loginForm.valid) {
			const { login, password } = loginForm.value;
			this.authStore.add(login, password);
		}
	}
}
