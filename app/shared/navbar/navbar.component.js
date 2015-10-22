import template from './navbar.html';
import controller from './navbar.component.js';
import navbarStyles from './navbar.scss';

let navbarComponent = function(){
  return{
    restrict: 'AE',
    scope:{
      orientation: '@',
      menuItems: '='
    },
    template,
    controller,
    controllerAs: 'nv',
    bindToController: true
  };
};

export default navbarComponent;
