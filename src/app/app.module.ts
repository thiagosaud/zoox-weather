import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ROOT CONFIG
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// SHARED MODULES
import { NgrxModule } from '@shared/modules/libraries/ngrx.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, NgrxModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
