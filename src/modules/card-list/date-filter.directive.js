import DateFilterController from './date-filter.controller';

export default function dateFilter() {
    return {
        template: require('./date-filter.template.html'),
        restrict: 'E',
        replace: true,
        scope: {},
        controller: DateFilterController,
        controllerAs: 'dateFilterCtrl'
    }
}