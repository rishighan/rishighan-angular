import template from './navbar.html';
import controller from './navbar.component.js';

let navbarComponent = function(){
  return{
    restrict: 'AE',
    scope:{
      horizontal: '@'
    },
    template,
    controller,
    controllerAs: 'nv',
    bindToController: true
  };
};

export default navbarComponent;
