/*
  In testing the application is totally separated which is nice
  and allows you to treat the functions that you write as separate
  entities
*/

require('polyfill-function-prototype-bind'); // for phantomjs
require('angular');
require('angular-mocks');

/* loads all the `.spec$|.test$` files in the src folder and all the sub directories */
/* also include the module exported from `src/module.js` */
var context = require.context('../tests', true, /(test|spec)\.(coffee|js)$|rgapp\.js/);
context.keys().forEach(context);