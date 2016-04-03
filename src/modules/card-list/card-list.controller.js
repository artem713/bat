import CardListService from './card-list.service';
const weekNumber = require('current-week-number');

export default class CardListController {
    constructor($http) {
        this.CardListService = new CardListService($http);
        this.loadCards().then(() => this.initialize());
    }

    initialize() {
        return this.prepareCardsByWeek();
    }

    prepareCardsByWeek() {
        const weeks = new Map();

        this.cards.forEach(card => {
            let cardWeekNumber = weekNumber(card.actualDate),
                weeksItem = weeks.get(cardWeekNumber);

            if(weeksItem) {
                weeksItem.push(card);
            } else {
                weeksItem = [card];
            }

            weeks.set(cardWeekNumber, weeksItem);
        });

        console.log(weeks.keys());
        console.log(new Map([...weeks.entries()].sort()));

        this.cardsByWeek = new Map([...weeks.entries()].sort());
        console.log(this.cardsByWeek);
    }

    getWeeks() {
        return this.cardsByWeek ? Array.from(this.cardsByWeek.keys()) : [];
    }

    getCardsByWeek(number) {
        return this.cardsByWeek.get(number);
    }

    loadCards() {
        var today = new Date();
        today.setDate(today.getDate() - 14); // todo: manually loading cards for 2 weeks - remove after implementing
        return this.CardListService
            .getCards(today)
            .then(cards => {
                this.cards = cards
            });
    }

    getCardListIsEmpty() {
        return this.cards && this.cards.length === 0;
    }

    add() {
        this.cards.push({title: '', actualDate: new Date(), isNew: true});
        this.prepareCardsByWeek();
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