import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// PAGES COMPONENTS
import { ErrorPageComponent } from '@pages/error-page/error-page.component';
import { LoginPageComponent } from '@pages/login-page/login-page.component';
import { MasterPageComponent } from '@pages/master-page/master-page.component';

const routes: Routes = [
	{ path: 'login', component: LoginPageComponent },
	{ path: '404', component: ErrorPageComponent },
	{
		path: '',
		component: MasterPageComponent,
		loadChildren: () => import('@shared/modules/routes/master-childrens.module').then(module => module.MasterChildrensModule),
	},
	{ path: '**', redirectTo: '/404' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
