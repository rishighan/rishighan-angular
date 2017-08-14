const d3 = require('d3');
let sparklineComponent = function() {
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        link: renderSparkline(),
        template: '<svg ng-transclude class="sl"></svg>'
    };

    function renderSparkline() {
        return function (scope, el, attr) {
            el = d3.select(el[0]);
            var svg = el;
            var data = JSON.parse(el.text());
            var min = attr.min !== undefined ? +attr.min : d3.min(data);
            var max = attr.max !== undefined ? +attr.max : d3.max(data);
            el.text(''); // remove the original data text
            var r = attr.r || 0;
            var m = r;
            var w = svg.node().clientWidth;
            var h = +getComputedStyle(el.node())['font-size'].replace('px', '');
            svg.attr({width: w, height: h});
            var x = d3.scale.linear().domain([0, data.length - 1]).range([m, w - m]);
            var y = d3.scale.linear().domain([min, max]).range([h - m, m]);
            var lines = svg.append('path').data(data)
                .attr('d', 'M' + data.map(function (d, i) {
                        return [x(i), y(d)]
                    }).join('L'));
            var circles = svg.selectAll('circle').data(data).enter().append('circle')
                .attr('r', r)
                .attr('cx', function (d, i) {
                    return x(i)
                })
                .attr('cy', function (d) {
                    return y(d)
                });
        };
    }
};

export default sparklineComponent;