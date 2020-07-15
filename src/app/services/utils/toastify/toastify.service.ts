import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastifyUtilsService {
	constructor(protected readonly toastr: ToastrService) {}

	info(title: string, message: string): void {
		this.toastr.info(title, message);
	}

	success(title: string, message: string): void {
		this.toastr.success(title, message);
	}

	error(title: string, message: string): void {
		this.toastr.error(title, message);
	}
}
