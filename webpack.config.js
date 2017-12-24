const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};
const config = {
    entry: {
        'index': PATHS.src + '/scripts/index.js',
        'blog': PATHS.src + '/scripts/blog.js',
        'about': PATHS.src + '/scripts/about.js',
        'my-works': PATHS.src + '/scripts/my-works.js'
    },
    output: {
        path: PATHS.build,
        filename: './[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.ProvidePlugin ({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
            },
        ],
    },
    'devtool':'source-map'
};

module.exports = config;