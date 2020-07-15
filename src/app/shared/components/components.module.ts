import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// FORMS COMPONENTS
import { CreateFormComponent } from './forms/create-form/create-form.component';

// NAVBARS COMPONENTS
import { HeaderNavComponent } from './navbars/header-nav/header-nav.component';
import { FooterNavComponent } from './navbars/footer-nav/footer-nav.component';
import { FooterNavControllerComponent } from './navbars/footer-nav/footer-nav-controller/footer-nav-controller.component';

// CARDS COMPONENTS
import { CardDefaultComponent } from './cards/card-default/card-default.component';

// UTILS COMPONENTS
import { IconComponent } from './utils/icon/icon.component';
import { SelectOptionComponent } from './utils/select-option/select-option.component';
import { ButtonComponent } from './utils/button/button.component';
import { ImageComponent } from './utils/image/image.component';

const Components = [
	CreateFormComponent,
	HeaderNavComponent,
	FooterNavComponent,
	FooterNavControllerComponent,
	CardDefaultComponent,
	IconComponent,
	SelectOptionComponent,
	ButtonComponent,
	ImageComponent,
];

@NgModule({
	declarations: [Components],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [Components],
})
export class ComponentsModule {}
