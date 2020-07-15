import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// FORMS COMPONENTS
import { CreateFormComponent } from '@shared/components/forms/create-form/create-form.component';

const Components = [CreateFormComponent];

@NgModule({
	declarations: [Components],
	imports: [CommonModule],
	exports: [Components],
})
export class ComponentsModule {}
