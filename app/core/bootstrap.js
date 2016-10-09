/*jslint browser:true */
'use strict';
require("angular");
require("angular-ui-router");

var appModule = require('../app');

angular.element(document).ready(function(){
    angular.bootstrap(document, [appModule.name], {
    });
});
