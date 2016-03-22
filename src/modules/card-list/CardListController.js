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
        this.cards.push({title: '', actualDate: new Date(), isNew: true});
    }
}

CardListController.$inject = ['$http'];