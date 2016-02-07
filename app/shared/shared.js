// import angular from 'angular';
import Navbar from './navbar/navbar';
import NavUtilsService from './utils/navutils.service';

let sharedModule = angular.module('app.shared', [
  Navbar.name
])

.service('NavUtilsService', NavUtilsService);

export default sharedModule;
