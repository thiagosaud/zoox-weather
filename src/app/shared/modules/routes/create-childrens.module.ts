import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// FORM COMPONENT
import { CreateFormComponent } from '@shared/components/forms/create-form/create-form.component';

// RESOLVER SERVICE
import { WorldStoreResolver } from '@services/resolvers/world-store/world-store.service';

// MASTER CHILDRENS COMPONENTS PAGES
const routes: Routes = [
	{
		path: 'country',
		component: CreateFormComponent,
		resolve: { world: WorldStoreResolver },
	},
	{
		path: 'city',
		component: CreateFormComponent,
		resolve: { world: WorldStoreResolver },
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CreateChildrensModule {}
