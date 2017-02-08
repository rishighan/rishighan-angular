import template from './trampoline.html';
import controller from './trampoline.controller.js';

let trampolineComponent = function(){
  return{
      restrict: 'AE',
      scope: {},
      template: template,
      controller: controller,
      controllerAs: 'tc'
  };
};

export default trampolineComponent;