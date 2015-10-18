// import angular from 'angular';
import uiRouter from 'ui-router';
import Shared from './shared/shared';
import Components from './components/components';
import AppComponent from './app.component';
import appModule from './core/bootstrap';

module.exports = angular.module('rgApp',[
  uiRouter,
  Shared.name,
  Components.name
])


.directive('rgApp', AppComponent);
