import template from './login.html';
import controller from './login.controller';

let loginComponent = function() {
    return {
        scope: {},
        restrict: 'E',
        template,
        controller,
        controllerAs: 'loginc',
        bindToController: true
    }
};

export
default loginComponent;