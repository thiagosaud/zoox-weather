import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// FORM COMPONENT
import { CreateFormComponent } from '@shared/components/forms/create-form/create-form.component';

// MASTER CHILDRENS COMPONENTS PAGES
const routes: Routes = [
	{ path: 'country', component: CreateFormComponent },
	{ path: 'city', component: CreateFormComponent },
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CreateChildrensModule {}
