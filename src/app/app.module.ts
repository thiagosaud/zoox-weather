import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// ROOT CONFIG
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// SHARED MODULES
import { NgrxModule } from '@shared/modules/libraries/ngrx.module';
import { ToastifyModule } from '@shared/modules/libraries/toastify.module';
import { PagesModule } from '@pages/pages.module';

// INTERCEPTORS
import { HttpErrorInterceptor } from '@interceptors/http/http-error.interceptor';

registerLocaleData(localeBr, 'pt');

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, NgrxModule, ToastifyModule, PagesModule],
	providers: [
		{ provide: LOCALE_ID, useValue: 'pt' },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
