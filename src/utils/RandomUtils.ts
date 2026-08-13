export type DateUnit = 'days' | 'months' | 'years';

export class RandomUtils {
    static randomArray<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)]!;
    }

    /**
     * Returns a random past date between `yearsAgoMax` and `yearsAgoMin` years back from today.
     * Example: randomPastDate(10, 1) -> a date between 10 years ago and 1 year ago.
     */
    static randomPastDate(yearsAgoMax: number, yearsAgoMin: number = 0): Date {
        const today = new Date();
        const end = new Date(today);
        end.setFullYear(today.getFullYear() - yearsAgoMin);

        const start = new Date(today);
        start.setFullYear(today.getFullYear() - yearsAgoMax);

        const startTime = start.getTime();
        const endTime = end.getTime();
        const randomTime = startTime + Math.random() * (endTime - startTime);
        return new Date(randomTime);
    }

    /**
     * Returns a random date strictly after `fromDate`, but not later than today (or optional maxDate).
     */
    static randomDateAfter(fromDate: Date, maxDate: Date = new Date()): Date {
        const startTime = fromDate.getTime();
        const endTime = maxDate.getTime();
        if (startTime >= endTime) return new Date(fromDate);
        const randomTime = startTime + Math.random() * (endTime - startTime);
        return new Date(randomTime);
    }

    /**
     * Returns an EXACT date in the past, offset by a fixed amount from today.
     * Example: exactPastDate(5, 'days')   -> exactly 5 days ago
     * Example: exactPastDate(1, 'months') -> exactly 1 month ago
     * Example: exactPastDate(2, 'years')  -> exactly 2 years ago
     */
    static exactPastDate(value: number, unit: DateUnit = 'days'): Date {
        return RandomUtils.applyOffset(new Date(), -Math.abs(value), unit);
    }

    /**
     * Returns an EXACT date in the future, offset by a fixed amount from today.
     * Example: exactFutureDate(5, 'days')   -> exactly 5 days from now
     * Example: exactFutureDate(1, 'months') -> exactly 1 month from now
     * Example: exactFutureDate(2, 'years')  -> exactly 2 years from now
     */
    static exactFutureDate(value: number, unit: DateUnit = 'days'): string {
        let futureDate =  RandomUtils.applyOffset(new Date(), Math.abs(value), unit);
        return this.formatDate(futureDate)
    }

    /** Internal helper: applies a +/- offset of days/months/years to a base date */
    private static applyOffset(base: Date, amount: number, unit: DateUnit): Date {
        const result = new Date(base);
        switch (unit) {
            case 'days':
                result.setDate(result.getDate() + amount);
                break;
            case 'months':
                result.setMonth(result.getMonth() + amount);
                break;
            case 'years':
                result.setFullYear(result.getFullYear() + amount);
                break;
        }
        return result;
    }

    /** Returns today's exact date */
    static today(): Date {
        return new Date();
    }

    /** Formats a Date as DD-MM-YYYY */
    static formatDate(date: Date): string {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}-${dd}-${yyyy}`;
    }

    static generateUniqueEmail(name: string, domain: string = 'testuser.com'): string {
        const sanitizedName = name
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');

        const timestamp = Date.now().toString(36); // e.g. 'mc4a1z9k' instead of '1751641234567'

        return `${sanitizedName}_${timestamp}@${domain}`;
    }
}