import template from './illustrations.html';
import controller from './illustrations.controller';
import illustrationStyles from './illustrations.scss';

let IllustrationsComponent = function(){
    return {
        restrict: 'AE',
        scope: {},
        template,
        controller,
        controllerAs: 'ic'
    };
};

export default IllustrationsComponent;