import Navbar from './navbar/navbar';
import FormlyDataService from './utils/formlydata.service';
import AnalyticsService from './analytics/analytics.service';
import HelperService from './utils/helper.service';
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
    .service('FormlyDataService', FormlyDataService)
    .service('HelperService', HelperService);

export default sharedModule;

