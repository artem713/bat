require("!style!css!sass!./styles.scss");

import angular from 'angular';
import uirouter from 'angular-ui-router';
import focusIf from 'ng-focus-if';

import card from './card';

export default angular.module('app.card', [uirouter, focusIf])
    .directive('card', card)
    .name;
