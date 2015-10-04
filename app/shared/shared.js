import angular from 'angular';
import Navbar from './navbar/navbar';

let sharedModule = angular.module('app.shared', [
  Navbar.name
]);

export default sharedModule;
