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

    public static formatTimestamp(timestamp: number): string {
        const date = new Date(timestamp * 1000);
        const now = new Date();

        const diffInMs = now.getTime() - date.getTime();
        const diffInSeconds = Math.floor(diffInMs / 1000);

        const days = Math.floor(diffInSeconds / (3600 * 24));
        const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);

        // const minutes = Math.floor((diffInSeconds % 3600) / 60);
        // const seconds = diffInSeconds % 60;

        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });


        const relativeTime = days > 0 ? `${days} days ago` : `${hours} hours ago`;
        return `${relativeTime}, ${formattedTime}`;
    }


}