import template from './admin.html';
import controller from './admin.controller';


let adminComponent = function(){
    return{
        scope:{

        },
        restrict: 'E',
        template,
        controller,
        controllerAs: 'adminc',
        bindToController: true
    };
};

export default adminComponent;