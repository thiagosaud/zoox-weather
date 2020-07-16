import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

// INTERFACES
import { IUserAuthentication } from '@store/authentication/auth.interface';

// SERVICES
import { AuthStoreService } from '@services/store/authentication/auth.service';
import { AuthUtilsService } from '@services/utils/authentication/auth.service';

@Component({
	selector: 'zx-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnDestroy {
	protected subscription$ = new Subscription();
	user$ = new BehaviorSubject<IUserAuthentication | null>(null);

	constructor(protected readonly authStore: AuthStoreService, protected readonly authService: AuthUtilsService) {
		this.authStore.add('mecontrate@zoox.com.br', 'zoox'); // FAKER
		this.subscription$ = this.authStore.get$().subscribe(auth => this.user$.next(auth?.user));
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.user$.unsubscribe();
	}

	logout(): void {
		this.authStore.delete(this.authService.token);
	}
}
