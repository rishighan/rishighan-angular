let jsonld = function ($sanitize, $sce, $filter) {
    return {
        restrict: 'AE',
        template: function () {
            return '<script type="application/ld+json" ng-bind-html="onJson()"></script>';
        },
        scope: {
            json: '='
        },
        replace: true,
        link: function (scope, element, attributes, controller) {
            scope.onJson = function () {
                return $sce.trustAsHtml($filter('json')(scope.json));
            };
        }
    };
};

export default jsonld;