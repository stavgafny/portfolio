export default class ContributionFormatter {

    private static readonly months = ["January","February","March","April","May","June","July","August","September","October","November","December"] as const;
    private static readonly monthsShorten = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
    private static readonly daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] as const;
    private static readonly daysOfWeekShorten = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    static format({ date, count }: { date: Date; count: number }): string {
        return `${count} contributions on ${ContributionFormatter.getDayOfWeek(
            date
        )}, ${ContributionFormatter.getMonthNameFromDate(date)}, ${date.getDate()}`;
    }

    static getShortenMonth(monthNumber: number) {
        return this.monthsShorten[monthNumber];
    }

    static getShortenDayOfWeek(dayNumber: number) {
        return this.daysOfWeekShorten[dayNumber];
    }

    private static getMonthName(monthNumber: number) {
        return this.months[monthNumber];
    }

    private static getMonthNameFromDate(date: Date): string {
        return this.getMonthName(date.getMonth());
    }

    private static getDayOfWeek(date: Date): string {
        return this.daysOfWeek[date.getDay()];
    }
}
