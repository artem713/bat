import CardListService from './CardListService';

export default class CardListController {
    constructor($http) {
        this.CardListService = new CardListService($http);
        this.loadCards();
        this.daysOfTheWeek = this.getDaysOfTheWeek();
    }

    loadCards() {
        this.CardListService.getCards().then((response) => {
            this.cards = response.data;
        });
    }

    add() {
        this.cards.push({title: '', actualDate: new Date(), isNew: true});
    }

    getDaysOfTheWeek() {
        return Array.from(this.CardListService.getDayOfTheWeek());
    }

    getCards(dayOfTheWeek) {
        return this.cards ? this.cards.filter(card => {
            return new Date(card.actualDate).getDate() === dayOfTheWeek.getDate();
        }) : [];
    }

    hasCards(dayOfTheWeek) {
        return this.getCards(dayOfTheWeek).length > 0;
    }
}

CardListController.$inject = ['$http'];