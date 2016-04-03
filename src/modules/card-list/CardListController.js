import CardListService from './CardListService';

export default class CardListController {
    constructor($http) {
        this.CardListService = new CardListService($http);
        this.days = this.getDays();
        this.loadCards();
    }

    loadCards() {
        this.CardListService
            .getCards()
            .then(cards => this.cards = cards)
    }

    add() {
        this.cards.push({title: '', actualDate: new Date(), isNew: true});
    }

    getDays() {
        return Array.from(this.CardListService.getDays());
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