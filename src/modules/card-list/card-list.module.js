require("!style!css!sass!./styles.scss");

import angular from 'angular';
import card from '../card/card.module'

import cardList from './card-list';
import cardListService from './CardListService';

export default angular.module('app.card-list', [card])
    .directive('cardList', cardList)
    .name;
