const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "src/dist/style.[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

console.log(__dirname + '/src/dist')

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
    entry: ['./src/app/index.js', './src/app/style/index.scss'],
    output: {
        path: __dirname + '/src/dist',
        filename: 'bundle.js'
        // filename: './src/dist/bundle.js'
    },
    node: {
        dns: 'mock',
        net: 'mock'
    },
    module: {
        loaders: [{
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    presets: ['preact', 'env', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            }
        ],
    },
    plugins: [
        extractSass, 
        new HtmlWebpackPlugin({
            // template: './src/app/index.ejs',
            // minify: { collapseWhitespace: true }
        })
    ]
}
