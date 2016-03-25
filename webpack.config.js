var path = require('path');
module.exports = {
    resolve: {
        root: ['./editor/js/app'].map((p) => path.resolve(p)),
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
            }
        ]
    },
    entry: "index.jsx",
    output: {
        path: __dirname + "/editor/assets",
        filename: "bundle.js"
    },
    devtool: 'source-map'
}