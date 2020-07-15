import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// MASTER CHILDRENS COMPONENTS PAGES
import { ProfilePageComponent } from '@pages/profile-page/profile-page.component';
import { SearchPageComponent } from '@pages/search-page/search-page.component';
import { CreatePageComponent } from '@pages/create-page/create-page.component';
import { ViewPageComponent } from '@pages/view-page/view-page.component';

const routes: Routes = [
	{ path: 'profile', component: ProfilePageComponent },
	{ path: 'search', component: SearchPageComponent },
	{ path: 'view', component: ViewPageComponent },
	{
		path: 'create',
		component: CreatePageComponent,
		loadChildren: () => import('@shared/modules/routes/create-childrens.module').then(module => module.CreateChildrensModule),
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MasterChildrensModule {}
