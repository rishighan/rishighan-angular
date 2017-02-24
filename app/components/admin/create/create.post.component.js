import template from './admin.create.html';
import controller from './create.post.controller';

let createPostComponent = function(){
    return{
        scope:{

        },
        restrict: 'E',
        template,
        controller,
        controllerAs: 'newpostc',
        bindToController: true
    };
};

export default createPostComponent;