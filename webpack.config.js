const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


function isProduction () {
    return process.env.WEBPACK_ENV === 'production'
}

const extractCss = new ExtractTextPlugin('style.css');

const config = {
    entry: {
        'vendor': './app/vendor',
        'app': './app/bootstrap',
        'css': './app/scss/main.scss'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.es6', '.js', '.json', '.scss']
    },
    target: 'electron',
    module: {
        preLoaders: [
            {test: /\.ts$/, exclude: /node_modules/, loader: 'tslint'}
        ],
        loaders: [
            {test: /\.ts$/, exclude: /node_modules/, loader: 'ts'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.scss/, loader: extractCss.extract(['css?sourceMap', 'sass?sourceMap'])}
        ]
    },
    plugins: [
        extractCss
    ]
};

if (isProduction()) {
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            comments: false
        }),
        new webpack.DefinePlugin({'WEBPACK_ENV': '"production"'}),
        new CopyWebpackPlugin([{from: './src/index.html'}], {})
    ]);
} else {
    config.devtool = 'source-map';
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({'WEBPACK_ENV': '"dev"'})
    ]);
}

module.exports = config;
