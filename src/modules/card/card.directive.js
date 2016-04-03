import CardController from './card.controller';

export default function card() {
    return {
        template: require('./card.template.html'),
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