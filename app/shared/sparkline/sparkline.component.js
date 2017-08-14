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
        template: '<svg id="sparkline"></svg>',
        compile: function (scope, attrs) {
            console.log(attrs.$$element[0].firstChild.id)
            defaultChartConfig(attrs.$$element[0].firstChild.id, scope.data);
            function defaultChartConfig(containerId, data) {
                nvd3.addGraph(function () {
                    let chart = nvd3.models.sparklinePlus();
                    chart.margin({left: 5})
                        .x(function (d, i) {
                            return i;
                        })
                        .showLastValue(true)
                        .xTickFormat(function (d) {
                            return data[d].x;
                        })
                        .y(function(d){
                            return d.y;
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
    };
};

export default sparklineComponent;