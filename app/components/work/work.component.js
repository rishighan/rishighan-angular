import template from './work.html';
import controller from './work.controller.js';

let workComponent = function(){
  return{
    restrict: 'AE',
    scope:{},
    template,
    controller,
    controllerAs: 'wc',
    bindToController: true
  };
};

export default workComponent;
