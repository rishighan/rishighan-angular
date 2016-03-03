import template from './notification.html';
import controller from './notification.controller.js';
import navbarStyles from './notification.scss';

let notificationComponent = function($timeout) {
    return {
        restrict: 'AE',
        scope: {
            message: '='
        },
        template,
        controller,
        controllerAs: 'notc',
        bindToController: true,
        link: function(scope, element, attrs, ctrl) {

        }
    };
};

export
default notificationComponent;