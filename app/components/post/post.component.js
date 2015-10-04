import template from './post.html';
import controller from './post.controller.js';

let postComponent = function(){
  return{
    restrict: 'AE',
    scope:{},
    template,
    controller,
    controllerAs: 'pc',
    bindToController: true
  };
};

export default postComponent;