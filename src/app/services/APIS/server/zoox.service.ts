import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

// STORE ITEMS CONFIG
import { IUserAuthentication } from '@store/authentication/auth.interface';
import { IWorldCountry } from '@store/world/world.interface';

@Injectable({ providedIn: 'root' })
export class ZooxApiService {
	protected readonly userUrl = environment.APIS.server.userUrl;
	protected readonly worlDatadUrl = environment.APIS.server.worldUrl;

	constructor(protected readonly http: HttpClient) {}

	getUser(username: string, password: string): Observable<IUserAuthentication[]> {
		return this.http.get<IUserAuthentication[]>(this.userUrl, {
			params: {
				username,
				password,
			},
		});
	}

	getWorld(): Observable<IWorldCountry[]> {
		return this.http.get<IWorldCountry[]>(this.worlDatadUrl);
	}

	updateWorld(updates: Update<IWorldCountry>): Observable<Update<IWorldCountry>> {
		return this.http.patch<Update<IWorldCountry>>(`${this.worlDatadUrl}/${updates.id}`, {
			...updates.changes,
		});
	}
}
