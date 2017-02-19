import workComponent from './work.component';

let workModule = angular.module('work', [
    'ui.router'
])
    .config(($stateProvider) => {
        $stateProvider
            .state('project', {
                url: '/work/:slug',
                template: '<single></single>',
                params: {id: undefined},
                access: {restricted: false}
            });
    })
    .directive('work', workComponent);


export default workModule;
