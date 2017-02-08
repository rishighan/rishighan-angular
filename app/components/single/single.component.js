import Post from '../post/post.component';
import template from './single.html';
import controller from './single.controller';

let singleComponent = function(){
    return {
        scope: {},
        restrict: 'AE',
        template: template,
        controller: controller,
        controllerAs: 'sc'
    };
};

export default singleComponent;
