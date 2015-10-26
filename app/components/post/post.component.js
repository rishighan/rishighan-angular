import template from './post.html';
import controller from './post.controller.js';

let postComponent = function(){
  return{
    restrict: 'AE',
    scope:{
        title: '=',
        excerpt: '=',
        body: '=',
        citations: '=',
        dateCreated: '=',
        dateModified: '=',
        attachments: '='
    },
    template,
    controller,
    controllerAs: 'pc',
    bindToController: true
  };
};

export default postComponent;