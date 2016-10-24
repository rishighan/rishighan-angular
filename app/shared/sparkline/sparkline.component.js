const nvd3 = require("nvd3");
const d3 = require("d3");
require('nvd3.css');

let sparklineComponent = function () {
    return {
        restrict: 'AE',
        scope: {
            data: '=',
            options: '='
        },
        transclude: true,
        template: '<svg id="jugni"></svg>',
        link: function (scope, el, attrs, ctrl) {
            scope.$watch('data', function(newValue, oldValue){
                // data -> [{x: 1, y: 123},  {x: 123, y: 132}]
                defaultChartConfig("#jugni", newValue);
            });

            function defaultChartConfig(containerId, data) {
                nvd3.addGraph(function () {
                    var chart = nvd3.models.sparklinePlus();
                    chart.margin({left: 0})
                        .x(function (d, i) {
                            return i;
                        })
                        .showLastValue(true)
                        .xTickFormat(function (d) {
                            return data[d].x;
                        })
                        .width(200)
                        .height(40);
                    d3.select(containerId)
                        .datum(data)
                        .call(chart);
                    return chart;
                });
            }


        }
    }
};

export default sparklineComponent;