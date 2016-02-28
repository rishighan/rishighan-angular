// import angular from 'angular';
import Navbar from './navbar/navbar';
import Notification from './notification/notification';
import NavUtilsService from './utils/navutils.service';
import FormlyDataService from './utils/formlydata.service';
import FormlyDataFactory from './utils/formlydata.service';
import MessageUtilsService from './utils/messageutils.service';


let sharedModule = angular.module('app.shared', [
  Navbar.name,
  Notification.name
])

.service('NavUtilsService', NavUtilsService)
.service('FormlyDataService', FormlyDataService)
.service('MessageUtilsService', MessageUtilsService)
.factory('FormlyDataService.formlyDataFactory', FormlyDataService);

export default sharedModule;
