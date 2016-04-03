import DateFilterController from './DateFilterController';

export default function dateFilter() {
    return {
        template: require('./date-filter.html'),
        restrict: 'E',
        replace: true,
        scope: {},
        controller: DateFilterController,
        controllerAs: 'dateFilterCtrl'
    }
}