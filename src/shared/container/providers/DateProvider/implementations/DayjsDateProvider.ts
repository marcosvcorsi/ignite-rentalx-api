import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../protocols/IDateProvider';

export class DayjsDateProvider implements IDateProvider {
  constructor() {
    dayjs.extend(utc);
  }

  diffInHours(end_date: Date, start_date: Date): number {
    const normalizeEndDate = dayjs(end_date).utc().local().format();
    const normalizeStartDate = dayjs(start_date).utc().local().format();

    return dayjs(normalizeEndDate).diff(normalizeStartDate, 'hours');
  }

  diffInDays(end_date: Date, start_date: Date): number {
    const normalizeEndDate = dayjs(end_date).utc().local().format();
    const normalizeStartDate = dayjs(start_date).utc().local().format();

    return dayjs(normalizeEndDate).diff(normalizeStartDate, 'days');
  }

  addDays(date: Date, days: number): Date {
    return dayjs(date).add(days, 'days').toDate();
  }

  addHours(date: Date, hours: number): Date {
    return dayjs(date).add(hours, 'hours').toDate();
  }
}
