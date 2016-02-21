import Shared from './shared/shared';
import Components from './components/components';
import AppComponent from './app.component';
import $translateProvider from 'pascalprecht.translate';
import $translateStaticFilesLoader from 'translate.static.file.loader';
require('./app.scss');
import ngMessages from 'ngMessages';

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
    .config(function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/locale/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en_US');
        $translateProvider.useSanitizeValueStrategy(null);

    });