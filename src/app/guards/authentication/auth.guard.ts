import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// SERVICES
import { AuthUtilsService } from '@services/utils/authentication/auth.service';
import { RouterUtilsService } from '@services/utils/router/router.service';

/** @description This guard handles and handles user authentication in the application. */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(protected readonly authService: AuthUtilsService, protected readonly routerService: RouterUtilsService) {}

	/** @description Checks if the user is authenticated, otherwise block access to certain routes. */
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authService.hasToken) {
			return true;
		} else {
			this.routerService.navigateTo('/login');
			return false;
		}
	}
}
