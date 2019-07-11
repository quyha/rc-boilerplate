const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: {
                        keep_fnames: true,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: { chunks: 'all' }
    }
};
