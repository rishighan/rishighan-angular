import Shared from "./shared/shared";
import Components from "./components/components";
import AppComponent from "./app.component";
import $translateProvider from "pascalprecht.translate";
import $translateStaticFilesLoader from "translate.static.file.loader";
require('./app.scss');


module.exports = angular.module('rgApp', [
    'ui.router',
    $translateProvider,
    $translateStaticFilesLoader,
    Shared.name,
    Components.name
])
    .directive('rgApp', AppComponent)
    .constant('LOCALES', {
        'locales': {
            'en_US': 'English'
        },
        'preferredLocale': 'en_US'
    })
    .config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/locale/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en_US');
        $translateProvider.useSanitizeValueStrategy(null);

    })
    .run(function ($rootScope, $location, $state, AuthenticationService) {
        $rootScope.$on('$stateChangeStart', function (event, next, current) {
            AuthenticationService.getUserStatus()
                .then(function () {
                    if (next.access.restricted && !AuthenticationService.isLoggedIn()) {
                        $state.go('login');
                    }
                });
        });
    });