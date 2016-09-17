import showdown from "showdown";

let markdownComponent = function ($sanitize, $sce) {
    return {
        restrict: 'A',
        scope: {
            data: '='
        },
        template: '<div ng-bind-html="trustedHtml"></div>',
        link: getLinkFn($sanitize, $sce)
    };

    function getLinkFn($sanitize, $sce) {
        return function (scope, element, attrs) {
            scope.$watch('data', function (newValue) {
                var converter = new showdown.Converter({extensions: ['prettify']});
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