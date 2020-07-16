import { Injectable } from '@angular/core';

// SERVICES
import { RouterUtilsService } from '@services/utils/router/router.service';

@Injectable({
	providedIn: 'root',
})
export class AuthUtilsService {
	constructor(protected readonly routerService: RouterUtilsService) {}

	get token(): string {
		return sessionStorage.getItem('token');
	}

	get hasToken(): boolean {
		return !!this.token;
	}

	createToken(): void {
		sessionStorage.setItem('token', '406b6dec-c62e-11ea-87d0-0242ac130003');
	}

	removeToken(): void {
		sessionStorage.removeItem('token');
	}
}
