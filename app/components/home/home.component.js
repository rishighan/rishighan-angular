import template from './home.html';
import controller from './home.controller.js';

let homeComponent = function(){
  return{
    restrict: 'E',
    scope:{},
    template,
    controller,
    controllerAs: 'hc',
    bindToController: true
  };
};

export default homeComponent;
