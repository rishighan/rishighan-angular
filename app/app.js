import Shared from './shared/shared';
import Components from './components/components';
import AppComponent from './app.component';

require('./app.scss');

module.exports = angular.module('rgApp',[
  'ui.router',
  Shared.name,
  Components.name
])
.directive('rgApp', AppComponent);
