import template from "./admin.edit.html";
import controller from "./edit.post.controller";

let editPostComponent = function () {
    return {
        scope: {},
        restrict: 'E',
        template,
        controller,
        controllerAs: 'edpc',
        bindToController: true
    };
};

export default editPostComponent;