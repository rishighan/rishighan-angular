import template from './navbar.html';
import controller from './navbar.controller.js';
require('./navbar.scss');

let navbarComponent = function(){
  return{
    restrict: 'AE',
    scope:{
      orientation: '@',
      logo: '=',
      menuItems: '='
    },
    template,
    controller,
    controllerAs: 'nv',
    bindToController: true
  };
};

export default navbarComponent;
