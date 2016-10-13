// import angular from 'angular';
import Navbar from './navbar/navbar';
import Markdown from './markdown/markdown';
import NavUtilsService from './utils/navutils.service';
import FormlyDataService from './utils/formlydata.service';
import FormlyDataFactory from './utils/formlydata.service';


let sharedModule = angular.module('app.shared', [
  Navbar.name,
  Markdown.name
])

.service('NavUtilsService', NavUtilsService)
.service('FormlyDataService', FormlyDataService)
.factory('FormlyDataService.formlyDataFactory', FormlyDataService);

export default sharedModule;
