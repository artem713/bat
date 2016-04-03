export default class DateFilterService {

    constructor() {
    }

    getStartOfTheWeek() {
        const d = new Date(),
            day = d.getDay(),
            diff = d.getDate() - day + 1;
        return new Date(d.setDate(diff)); //todo: cover leap year
    }

    getEndOfTheWeek() {
        const d = new Date(),
            day = d.getDay(),
            diff = d.getDate() + 7 - day;
        return new Date(d.setDate(diff));
    }

    getDaysIterator(startDay = this.getStartOfTheWeek(), endDay = this.getEndOfTheWeek()) {

        return {
            [Symbol.iterator]() {

                let value = startDay.getDate();

                return {
                    next() {

                        if (value <= endDay.getDate()) {

                            return {
                                value: new Date(startDay.setDate(value++)),
                                done: false
                            };
                        }
                        return {
                            done: true
                        };
                    }
                };
            }
        };

    }
}