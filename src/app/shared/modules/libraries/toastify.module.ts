import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({ timeOut: 1500, progressBar: true, preventDuplicates: true, positionClass: 'toast-bottom-right', progressAnimation: 'increasing' }),
	],
	exports: [],
})
export class ToastifyModule {}
