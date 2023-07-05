export default class ContributionFormatter {
    static format({ date, count}: { date: Date, count: number}): string {
        return `${count} contributions on ${_DateHandler.getDayOfWeek(
            date.getDay(),
            date
          )}, ${_DateHandler.getMonthName(date.getMonth(), date)}, ${date.getDate()}`;
    }
}


class _DateHandler {
    static readonly months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    static readonly daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    static getMonthName(month: number, date: Date): string {
        return _DateHandler.months[date.getMonth()]
    }

    static  getDayOfWeek(day: number, date: Date): string {
        return _DateHandler.daysOfWeek[date.getDay()]
    }
}
