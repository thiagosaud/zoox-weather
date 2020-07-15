import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'environments/environment';

// NGRX CONFIG'S
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// STORE CONFIG
import * as Store from '@store/store';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		StoreModule.forRoot(Store.REDUCERS),
		EffectsModule.forRoot(Store.EFFECTS),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !environment.production }),
	],
	exports: [],
})
export class NgrxModule {}
