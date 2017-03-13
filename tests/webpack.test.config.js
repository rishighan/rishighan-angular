module.exports = {
    entry: './tests/*.js',
    output: {
        path: __dirname,
        filename: 'test-bundle.js'
    },
    node: {
        fs: 'empty'
    }
};