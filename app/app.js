import Shared from "./shared/shared";
import Components from "./components/components";
import AppComponent from "./app.component";
const $translateProvider = require("pascalprecht.translate");
require("angular-translate-loader-static-files");
require('./app.scss');
require("angulartics");
import googleAnalytics from "angulartics.google.analytics";
module.exports = angular.module('rgApp', [
    Shared.name,
    Components.name,
    $translateProvider,
    googleAnalytics
])
    .directive('rgApp', AppComponent)
    .constant('LOCALES', {
        'locales': {
            'en_US': 'English'
        },
        'preferredLocale': 'en_US'
    })
    .config(function ($translateProvider, $analyticsProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/locale/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en_US');
        $translateProvider.useSanitizeValueStrategy(null);
        console.log($analyticsProvider)
    })
    .run(function ($rootScope, $location, $state, AuthenticationService) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            AuthenticationService.getUserStatus()
                .then(() => {
                    if (toState.access.restricted && !AuthenticationService.isLoggedIn()) {
                        $state.go('login');
                    }
                });
        });
    });