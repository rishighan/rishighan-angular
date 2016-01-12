import template from './allposts.html';
import controller from './admin.controller';


let allPostsComponent = function(){
    return{
        scope:{

        },
        restrict: 'E',
        template,
        controller,
        controllerAs: 'adminc',
        bindToController: true
    };
};

export default allPostsComponent;