require("!style!css!sass!./card-list.styles.scss");

import angular from 'angular';
import card from '../card/card.module'

import cardList from './card-list.directive';
import week from './week/week.directive';
import dateFilter from './date-filter.directive';
import cardListService from './card-list.service';

export default angular.module('app.card-list', [card])
    .directive('cardList', cardList)
    .directive('week', week)
    .directive('dateFilter', dateFilter)
    .name;
