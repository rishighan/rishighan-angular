import controller from './app.controller';
import template from './components/admin/admin.html';

let AppComponent = () => {
  return{
    restrict: 'AE',
    scope: {},
    template,
    controller,
    controllerAs: 'ac'
  };
};

export default AppComponent;
