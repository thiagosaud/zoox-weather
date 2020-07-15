import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// SHARED MODULES
import { ComponentsModule } from '@shared/components/components.module';

// PAGES COMPONENTS
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { ViewPageComponent } from './view-page/view-page.component';

const Components = [
	ErrorPageComponent,
	LoginPageComponent,
	MasterPageComponent,
	ProfilePageComponent,
	SearchPageComponent,
	CreatePageComponent,
	ViewPageComponent,
];

@NgModule({
	declarations: [Components],
	imports: [CommonModule, RouterModule, ComponentsModule],
	exports: [Components],
})
export class PagesModule {}
