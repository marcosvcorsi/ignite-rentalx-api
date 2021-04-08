export interface IDateProvider {
  diffInHours(start_date: Date, end_date: Date): number;
  diffInDays(start_date: Date, end_date: Date): number;
  addDays(date: Date, days: number): Date;
}
