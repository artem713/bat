export default class WeekController {
    constructor() {
    }

    getCards(dayOfTheWeek) {
        return this.cards ? this.cards.filter(card => {
            return new Date(card.actualDate).getDay() === dayOfTheWeek;
        }) : [];
    }

    hasCards(dayOfTheWeek) {
        return this.getCards(dayOfTheWeek).length > 0;
    }
}