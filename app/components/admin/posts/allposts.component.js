import template from './admin.posts.html';
import controller from './allposts.controller';


let allPostsComponent = function(){
    return{
        scope:{

        },
        restrict: 'E',
        template,
        controller,
        controllerAs: 'pc',
        bindToController: true
    };
};

export default allPostsComponent;