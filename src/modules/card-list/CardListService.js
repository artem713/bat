export default class CardListService {

    constructor($http) {
        this.$http = $http;
    }

    getCards(startDate = this.getStartOfTheWeek(), endDate = this.getEndOfTheWeek()) {
        return this.$http.get('/card').catch((error) => {
            console.log(error);
        });
    }

    addCard() {
        return this.$http.post('/card').catch((error) => {
            console.log(error);
        });
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
}