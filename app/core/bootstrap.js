/*jslint browser:true */
'use strict';

// run the function that loads the dependencies
require('./vendor.js')();

var appModule = require('../app');

angular.element(document).ready(function(){
    angular.bootstrap(document, [appModule.name], {

    });
});