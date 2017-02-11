import template from './post.html';
import postStyles from './post.scss';

let postComponent = function () {
    return {
        restrict: 'AE',
        scope: {
            kind: '@', // normal, highlight, hero illustration, recipe
            postData: '='
        },
        template
    };
};

export default postComponent;