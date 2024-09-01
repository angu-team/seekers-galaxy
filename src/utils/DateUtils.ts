export class DateUtils {

    /**
     * A maior data em primeiro
     * @param date1
     * @param date2
     */
    static diffSeconds(date1: Date, date2: Date) {
        // @ts-ignore
        const differenceInMilliseconds = date1 - date2;
        return differenceInMilliseconds / 1000
    }

}