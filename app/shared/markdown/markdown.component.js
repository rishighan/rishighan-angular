const Remarkable = require('remarkable');
const hljs = require('highlightjs');
let markdown = function ($sanitize, $sce) {
    return {
        scope: {
            data: '='
        },
        restrict: 'AE',
        link: parseMarkdown($sanitize, $sce),
        template: '<div ng-bind-html="trustedHtml"></div>'
    };

    function parseMarkdown($sanitize, $sce) {
        return function (scope, element, attributes, controller) {
            scope.$watch('data', function (newValue) {
                let html = '';
                let md = new Remarkable({
                    html: true,
                    xhtmlOut: false,
                    breaks: false,
                    langPrefix: 'language-',
                    linkify: true,
                    typographer: true,
                    highlight: function (str, lang) {
                        if (lang && hljs.getLanguage(lang)) {
                            try {
                                return hljs.highlight(lang, str).value;
                            } catch (err) {
                            }
                        }
                        try {
                            return hljs.highlightAuto(str).value;
                        } catch (err) {
                        }
                        return ''; // use external default escaping
                    }
                });

                if (typeof newValue === 'string') {
                    html = md.render(newValue);
                    scope.trustedHtml = $sce.trustAsHtml(html);
                } else {
                    scope.trustedHtml = typeof newValue;
                }
            });
        };
    }
};
export default markdown;