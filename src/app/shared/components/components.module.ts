import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// FORMS COMPONENTS
import { CreateFormComponent } from './forms/create-form/create-form.component';

// NAVBARS COMPONENTS
import { HeaderNavComponent } from './navbar/header-nav/header-nav.component';

// UTILS COMPONENTS
import { IconComponent } from './utils/icon/icon.component';

const Components = [CreateFormComponent, HeaderNavComponent, IconComponent];

@NgModule({
	declarations: [Components],
	imports: [CommonModule],
	exports: [Components],
})
export class ComponentsModule {}
