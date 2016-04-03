import CardListController from './card-list.controller';

export default function cardList() {
    return {
        template: require('./card-list.template.html'),
        restrict: 'E',
        replace: true,
        scope: {},
        controller: CardListController,
        controllerAs: 'cardListCtrl'
    }
}