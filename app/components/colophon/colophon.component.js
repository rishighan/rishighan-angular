import template from './colophon.html';
import controller from './colophon.controller.js';

let colophonComponent = function(){
    return{
        restrict: 'E',
        scope:{},
        template,
        controller,
        controllerAs: 'cc',
        bindToController: true
    };
};

export default colophonComponent;