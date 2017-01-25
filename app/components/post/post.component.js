import template from './post.html';
import controller from './post.controller.js';

let postComponent = function () {
    return {
        restrict: 'E',
        scope: {
            kind: '@', // normal, highlight, hero illustration, recipe
        },
        template,
        controller,
        controllerAs: 'pc',
        link: function (scope, element, attributes) {
            console.log(element);
        }

    };
};

export default postComponent;