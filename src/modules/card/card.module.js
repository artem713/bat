require("!style!css!sass!./card.styles.scss");

import angular from 'angular';
import uirouter from 'angular-ui-router';
import focusIf from 'ng-focus-if';

import card from './card.directive';

export default angular.module('app.card', [uirouter, focusIf])
    .directive('card', card)
    .name;
