import workComponent from './work.component';

let workModule = angular.module('work', [
  'ui.router'
])
.directive('work', workComponent);

export default workModule;
