import template from './masthead.html';

let mastheadComponent = function () {
    return {
        restrict: 'AE',
        scope: {
            mastheadImage: '@',
            mastheadTitle: '@',
            illustrationSlug: '@'
        },
        template,
        link: function (scope, element, attributes, controller) {
            let masthead = element[0].getElementsByClassName('masthead');
            scope.$watch('mastheadImage', function (newValue, oldValue) {
                if (newValue !== '' && newValue !== oldValue) {
                    _.each(masthead, function (item) {
                        item.style.backgroundImage = 'url(' + newValue + ')';
                    });
                }
            });
        }
    };
};

export default mastheadComponent;