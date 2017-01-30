import template from './post.html';
import controller from './post.controller.js';
import postStyles from './post.scss';

let postComponent = function () {
    return {
        restrict: 'AE',
        scope: {
            kind: '@', // normal, highlight, hero illustration, recipe
            mastheadImage: '@',
            postData: '='
        },
        template,
        controller,
        controllerAs: 'pc',
        link: function (scope, element, attributes, controller) {
            let masthead = element[0].getElementsByClassName('masthead');
            scope.$watch('mastheadImage', function (newValue, oldValue) {
                if (newValue !== '' && newValue !== oldValue) {
                    angular.forEach(masthead, function (x) {
                        x.style.backgroundImage = 'url(/assets/images/' + newValue + ')';
                    });
                }
            });
        }
    };
};

export default postComponent;