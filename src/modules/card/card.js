import CardController from './CardController';

export default function card() {
    return {
        template: require('./card.html'),
        restrict: 'E',
        replace: true,
        scope: {
            card: '=?'
        },
        bindToController: true,
        controller: CardController,
        controllerAs: 'cardCtrl'
    }
}