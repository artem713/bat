routerConfig.$inject = ['$stateProvider'];

export default function routerConfig($stateProvider) {
    $stateProvider.state('card', {
        url: '/',
        template: require('./card.html'),
        controller: 'CardController as cardCtrl'
    });
}