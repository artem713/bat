require("!style!css!sass!./styles.scss");

import angular from 'angular';
import uirouter from 'angular-ui-router';

import router from './router';
import modules from './modules/modules';

angular.module('app', [
        ...modules,
        uirouter
    ])
    .config(router);
