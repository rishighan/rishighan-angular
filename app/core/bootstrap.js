'use strict';

// run the function that loads the dependencies
require('./vendor.js')();

var appModule = require('../index');

angular.element(document).ready(function(){
    angular.bootstrap(document, [appModule.name], {

    });
});