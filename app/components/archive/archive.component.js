import controller from './archive.controller';
import template from './archive.html';

let archiveComponent = () => {
    return {
        restrict: 'AE',
        scope: {},
        controller: controller,
        controllerAs: 'arc',
        template: template,
        bindToController: true
    };
};
export default archiveComponent;