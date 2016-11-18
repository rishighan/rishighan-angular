// import angular from 'angular';
// import uiRouter from 'ui-router';
import workComponent from './work.component';

let workModule = angular.module('work', [
  'ui.router'
])

.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('work', {
        url: '/work',
        template: '<work></work>',
        access: {restricted: false}
      });
})

.directive('work', workComponent);

export default workModule;
