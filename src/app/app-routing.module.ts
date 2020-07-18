import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

// PAGES COMPONENTS
import { ErrorPageComponent } from '@pages/error-page/error-page.component';
import { LoginPageComponent } from '@pages/login-page/login-page.component';
import { MasterPageComponent } from '@pages/master-page/master-page.component';

// GUARDS
import { AuthGuard } from '@guards/authentication/auth.guard';

const routes: Routes = [
	{ path: 'login', component: LoginPageComponent },
	{ path: '404', component: ErrorPageComponent },
	{
		path: '',
		component: MasterPageComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always',
		loadChildren: () => import('@shared/modules/routes/master-childrens.module').then(module => module.MasterChildrensModule),
	},
	{ path: '**', redirectTo: '/404' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
