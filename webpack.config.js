var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        root: ['./editor/'].map((p) => path.resolve(p)),
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { 
                test: /\.gql$/,
                loader:'graphql'
            }
        ]
    },
    entry: "index.jsx",
    output: {
        path: __dirname + "/public",
        publicPath:"/editor/",
        filename: "bundle.js"
    },
    devtool: 'source-map',
    plugins: [new HtmlWebpackPlugin({title:"api.mcjson.com Editor",template:"./editor/index.html"})]
}