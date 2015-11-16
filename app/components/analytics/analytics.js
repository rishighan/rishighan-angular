import AnalyticsService from './analytics.service';

let AnalyticsModule = angular.module('analytics', [])

.service('analyticsService', AnalyticsService);

export
default AnalyticsModule;