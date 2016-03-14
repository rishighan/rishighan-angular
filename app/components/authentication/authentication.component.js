import template from './register.html';
import controller from './authentication.controller';

let authenticationComponent = function(){
    return{
        scope: {

        },
        restrict: 'E',
        template,
        controller,
        controllerAs: 'authc',
        bindToController: true
    };
};
export default authenticationComponent;
