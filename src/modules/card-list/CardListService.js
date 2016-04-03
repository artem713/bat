export default class CardListService {

    constructor($http) {
        this.$http = $http;
    }

    getCards(startDate = this.getStartOfTheWeek(), endDate = this.getEndOfTheWeek()) {
        return this.$http.get('/card')
            .then(response => response.data)
            .catch(error => console.log(error));
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

    getDays() {
        const currentDay = this.getStartOfTheWeek();
        const endOfTheWeek = this.getEndOfTheWeek();

        return {
            [Symbol.iterator]() {

                let value = currentDay.getDate();

                return {
                    next() {

                        if (value <= endOfTheWeek.getDate()) {

                            return {
                                value: new Date(currentDay.setDate(value++)),
                                done: false
                            };
                        }
                        return {
                            done: true
                        };
                    }
                }
            }
        }
    }
}