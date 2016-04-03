import DateFilterService from './date-filter.service';

export default class DateFilterController {
    constructor() {
        this.DateFilterService = new DateFilterService();
        this.days = this.getDays();
    }

    getDays() {
        return Array.from(this.DateFilterService.getDaysIterator());
    }

    selectPeriod() {

    }
}