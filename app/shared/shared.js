// import angular from 'angular';
import Navbar from './navbar/navbar';
import NavUtilsService from './utils/navutils.service';
import FriendlyUrlService from './utils/friendlyurl.service';
import FormlyDataService from './utils/formlydata.service';
import AnalyticsService from './analytics/analytics.service';
import DomHelperService from './utils/domhelper.service';
import sparklineComponent from './sparkline/sparkline.component';
import jsonld from './json-ld/jsonld.component';
import markdown from './markdown/markdown.component';

let sharedModule = angular.module('app.shared', [
  Navbar.name,
])
    .directive('jsonld', jsonld)
    .directive('markdown', markdown)
    .directive('sparkline', sparklineComponent)
    .service('AnalyticsService', AnalyticsService)
    .service('NavUtilsService', NavUtilsService)
    .service('DomHelperService', DomHelperService)
    .service('FormlyDataService', FormlyDataService)
    .service('FriendlyUrlService', FriendlyUrlService)
    .factory('FormlyDataService.formlyDataFactory', FormlyDataService);

export default sharedModule;
