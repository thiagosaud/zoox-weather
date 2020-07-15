import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { RouterUtilsService } from '@services/utils/router/router.service';
import { ImageAssetsUtilsService } from '@services/utils/assets/image.service';
import { Subscription, Subscriber, BehaviorSubject } from 'rxjs';

@Component({
	selector: 'zx-create-page',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements AfterContentInit, OnDestroy {
	protected subscription$ = new Subscription();
	protected subscriber$ = new Subscriber<BehaviorSubject<boolean>>();
	isCreateRoute$ = new BehaviorSubject<boolean>(false);
	cardCountryImg: string;
	cardCityImg: string;

	constructor(public readonly routerUtils: RouterUtilsService, protected readonly imageAssets: ImageAssetsUtilsService) {
		this.subscription$ = this.routerUtils.routerState$.subscribe(state => {
			this.subscriber$.add(this.isCreateRoute$.next(state.create));
		});
	}

	ngAfterContentInit(): void {
		this.cardCountryImg = this.imageAssets.get('earth-locations');
		this.cardCityImg = this.imageAssets.get('earth');
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.subscriber$.unsubscribe();
	}
}
