import angular from 'angular';
import Home from './home/home';
import Work from './work/work';
import Post from './post/post';
import Admin from './admin/admin';
import AnalyticsModule from './analytics/analytics';

let componentModule = angular.module('app.components', [
  Home.name,
  Work.name,
  Post.name,
  Admin.name,
  AnalyticsModule.name
]);

export default componentModule;
