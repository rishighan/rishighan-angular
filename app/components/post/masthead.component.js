import template from './masthead.html';
import postStyles from './post.scss';

let mastheadComponent = function () {
    const ASSET_FOLDER = '/assets/images/';
    return {
        restrict: 'AE',
        scope: {
            mastheadImage: '@',
            mastheadTitle: '@'
        },
        template,
        link: function (scope, element, attributes, controller) {
            let masthead = element[0].getElementsByClassName('masthead');
            scope.$watch('mastheadImage', function (newValue, oldValue) {
                if (newValue !== '' && newValue !== oldValue) {
                    _.each(masthead, function(item){
                        item.style.backgroundImage = 'url(' + ASSET_FOLDER + encodeURIComponent(scope.mastheadImage) + ')';
                    });
                }
            });
        }
    };
};

export default mastheadComponent;