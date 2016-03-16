routeConfig.$inject = ['$urlRouterProvider'];

export default function routeConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}