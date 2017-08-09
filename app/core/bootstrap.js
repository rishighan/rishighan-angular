/* jslint browser:true */
require('angular');
require('angular-ui-router');

let appModule = require('../app');

angular.element(document).ready(() => {
    angular.bootstrap(document, [ appModule.name ], {
    });
});
