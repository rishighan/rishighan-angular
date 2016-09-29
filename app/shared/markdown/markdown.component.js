import ngSanitize from 'ngSanitize';
import showdown from 'showdown';
import showdownPrettify from 'showdown-prettify';
import footnotes from '../utils/showdown.footnotes.extension';

let markdownComponent = function($sanitize, $sce) {
    return {
        restrict: 'A',
        scope: {
            data: '='
        },
        template: '<div ng-bind-html="trustedHtml"></div>',
        link: getLinkFn($sanitize, $sce)
    };

    function getLinkFn($sanitize, $sce) {
        return function(scope, element, attrs) {
            scope.$watch('data', function(newValue) {
                var converter = new showdown.Converter({extensions:['prettify', footnotes]});
                converter.setOption('tables', true);
                var showdownHTML;
                if (typeof newValue === 'string') {
                    showdownHTML = converter.makeHtml(newValue);
                    scope.trustedHtml = (converter.getOption('sanitize')) ? $sanitize(showdownHTML) : $sce.trustAsHtml(showdownHTML);
                } else {
                    scope.trustedHtml = typeof newValue;
                }
            });
        };
    }
};

export
default markdownComponent;