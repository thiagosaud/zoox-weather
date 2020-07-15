import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({ providedIn: 'root' })
export class DateUtilsService {
	readonly datePreviousFiveDaysUnix = moment().tz('America/Sao_Paulo').subtract(5, 'days').unix();

	constructor() {}

	get localUTC(): string {
		return moment().tz('America/Sao_Paulo').utc().format();
	}

	/** @description Checks whether the entry date is between one of the following dates according to the timezone. */
	isDatePeriodBetweenFiveDays(unix: number, timezone: string): boolean {
		return moment.unix(unix).tz(timezone).fromNow() === '5 days ago';
	}
}
