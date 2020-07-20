import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'zx-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
	@Output() submitForm = new EventEmitter<FormGroup>();
	loginForm: FormGroup;

	constructor(protected readonly formBuilder: FormBuilder) {
		this.loginForm = formBuilder.group({
			login: formBuilder.control('', [Validators.minLength(1), Validators.maxLength(25), Validators.email, Validators.required]),
			password: formBuilder.control('', [Validators.minLength(1), Validators.maxLength(25), Validators.required]),
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		if (this.loginForm.valid) {
			this.submitForm.emit(this.loginForm);
		}
	}
}
