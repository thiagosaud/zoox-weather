import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	get token(): string {
		return sessionStorage.getItem('token');
	}

	createToken(): void {
		sessionStorage.setItem('token', '406b6dec-c62e-11ea-87d0-0242ac130003');
	}

	removeToken(): void {
		sessionStorage.removeItem('token');
	}
}
