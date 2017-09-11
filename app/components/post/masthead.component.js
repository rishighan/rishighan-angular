import template from './masthead.html';
import postStyles from './post.scss';

let mastheadComponent = function () {
    const ASSET_FOLDER = '/assets/images/';
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
                console.log(newValue);
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