require("!style!css!sass!./styles.scss");

import angular from 'angular';
import uirouter from 'angular-ui-router';

import card from './card';

export default angular.module('app.card', [uirouter])
    .directive('card', card)
    .name;
