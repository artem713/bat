import CardListController from './CardListController';

export default function cardList() {
    return {
        template: require('./card-list.html'),
        restrict: 'E',
        replace: true,
        scope: {},
        controller: CardListController,
        controllerAs: 'cardListCtrl'
    }
}