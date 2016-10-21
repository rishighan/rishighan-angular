// import angular from 'angular';
import Navbar from './navbar/navbar';
import Markdown from './markdown/markdown';
import NavUtilsService from './utils/navutils.service';
import FriendlyUrlService from './utils/friendlyurl.service';
import FormlyDataService from './utils/formlydata.service';
import AnalyticsService from './analytics/analytics.service';

let sharedModule = angular.module('app.shared', [
  Navbar.name,
  Markdown.name
])

    .service('AnalyticsService', AnalyticsService)
    .service('NavUtilsService', NavUtilsService)
    .service('FormlyDataService', FormlyDataService)
    .service('FriendlyUrlService', FriendlyUrlService)
    .factory('FormlyDataService.formlyDataFactory', FormlyDataService);

export default sharedModule;
