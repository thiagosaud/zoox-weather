import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// ENVIRONMENT
import { environment } from 'environments/environment';

/** @description Intercept errors for all http requests from the application. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
	protected readonly zooxUserUrl = environment.APIS.server.userUrl;

	constructor(protected readonly injector: Injector) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => this.handleError(event, request)),
			catchError((error: any, caught: Observable<any>) => throwError(error))
		);
	}

	/** @description Handles errors according to the request endpoint. */
	protected handleError(event: HttpEvent<any>, request: HttpRequest<unknown>): HttpEvent<any> {
		switch (request.url) {
			case this.zooxUserUrl:
				this.verifyUserAuthHttpRequest(event, request);
				break;
		}

		return event;
	}

	/** @description Checks the backend request to the user endpoint. */
	protected verifyUserAuthHttpRequest(event: HttpEvent<any>, request: HttpRequest<unknown>): void {
		const username = request.params.get('username');
		const password = request.params.get('password');

		// FAKE BACKEND CONTROLLER
		if (!(event instanceof HttpResponse) && (username !== 'mecontrate@zoox.com.br' || password !== 'zoox')) {
			throw new HttpErrorResponse({
				status: 401,
				statusText: 'Unauthorized',
			});
		}
	}

	/** @description Checks the backend request to the user data endpoint. */
	protected verifyUserDataHttpRequest(event: HttpEvent<any>, request: HttpRequest<unknown>): void {
		const userId = request.params.get('id');

		if (!(event instanceof HttpResponse) && !userId) {
			throw new HttpErrorResponse({
				status: 400,
				statusText: 'Bad Request',
			});
		}
	}
}
