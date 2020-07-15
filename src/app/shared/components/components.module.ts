import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// FORMS COMPONENTS
import { CreateFormComponent } from './forms/create-form/create-form.component';

// NAVBARS COMPONENTS
import { HeaderNavComponent } from './navbars/header-nav/header-nav.component';
import { FooterNavComponent } from './navbars/footer-nav/footer-nav.component';
import { FooterNavControllerComponent } from './navbars/footer-nav/footer-nav-controller/footer-nav-controller.component';

// UTILS COMPONENTS
import { IconComponent } from './utils/icon/icon.component';

const Components = [CreateFormComponent, HeaderNavComponent, FooterNavComponent, FooterNavControllerComponent, IconComponent];

@NgModule({
	declarations: [Components],
	imports: [CommonModule],
	exports: [Components],
})
export class ComponentsModule {}
