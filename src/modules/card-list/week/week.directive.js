import WeekController from './week.controller';

export default function week() {
    return {
        template: require('./week.template.html'),
        restrict: 'E',
        replace: true,
        scope: {
            cards: '='
        },
        controller: WeekController,
        controllerAs: 'weekController',
        bindToController: true
    }
}