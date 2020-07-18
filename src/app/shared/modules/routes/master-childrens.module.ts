import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// MASTER CHILDRENS COMPONENTS PAGES
import { ProfilePageComponent } from '@pages/profile-page/profile-page.component';
import { SearchPageComponent } from '@pages/search-page/search-page.component';
import { CreatePageComponent } from '@pages/create-page/create-page.component';
import { ViewPageComponent } from '@pages/view-page/view-page.component';

// RESOVLERS SERVICES
import { WorldStoreResolver } from '@services/resolvers/world-store/world-store.service';
import { WeatherStoreResolver } from '@services/resolvers/weather-store/weather-store.service';

const routes: Routes = [
	{ path: 'profile', component: ProfilePageComponent },
	{
		path: 'search',
		component: SearchPageComponent,
		resolve: { world: WorldStoreResolver },
	},
	{
		path: 'view',
		component: ViewPageComponent,
		resolve: { weather: WeatherStoreResolver },
	},
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
