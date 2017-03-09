module.exports = {
    entry: './tests/unit/analyticsService.spec.js',
    output: {
        path: __dirname,
        filename: 'test-bundle.js'
    },
    node: {
        fs: 'empty'
    }
};