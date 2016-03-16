import CardListService from './CardListService';

export default class CardListController {
    constructor($http) {
        this.CardListService = new CardListService($http);
        this.loadCards();
    }

    loadCards() {
        this.CardListService.getCards().then((response) => {
            this.cards = response.data;
        });
    }

    add() {
        this.CardListService.addCard().then((response) => {
            this.cards = response.data;
        });
    }
}

CardListController.$inject = ['$http'];