import angular from 'angular';
import uiRouter from 'ui-router';
import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbarModule',[])
.directive('navbar', navbarComponent);

export default navbarModule;
