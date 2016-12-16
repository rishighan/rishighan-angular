const converter = new (require('showdown').Converter)();

module.exports = () => [
    {
        type: 'lang', filter: function (text) {
        // Inline footnotes e.g. "foo[^1]"
        var i = 0;
        var inline_regex = /\[\^(\d|n)\](?!:)/g;
        text = text.replace(inline_regex, function (match, n) {
            // We allow both automatic and manual footnote numbering
            if (n === "n") n = i + 1;
            var s = '<sup id="fnref:' + n + '">' +
                    '<a href="#fn:' + n + '" rel="footnote">' + n + '</a>' +
                    '</sup>';
            i += 1;
            return s;
        });

        // Expanded footnotes at the end e.g. "[^1]: cool stuff"
        var end_regex = /\[\^(\d|n)\]: (.*?)\n/g;
        var m = text.match(end_regex);
        var total = m ? m.length : 0;
        i = 0;

        text = text.replace(end_regex, function (match, n, content) {
            if (n === "n") n = i + 1;
            var s = '<small><li class="footnote" id="fn:' + n + '">' +
                    content + '<a href="#fnref:' + n +
                    '" title="return to article"> ↩</a>' +
                    '</li></small>';
            if (i === 0) {
                s = '<div class="footnotes"><ol>' + s;
            }
            if (i === total - 1) {
                s = s + '</ol></div>';
            }
            i += 1;
            return s;
        });

        return text;
    }
    }
];