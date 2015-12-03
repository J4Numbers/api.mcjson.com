var path = require('path');
module.exports = {
	resolve: {
		root: ['./editor/js/app'].map((p)=>path.resolve(p)),
		alias: {
			'mvc':'es6mvc'
		}
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel',
				query:{
					modules: 'amd',
					optional: ['runtime']
				}
			}
		]
	},
	entry: "app.js",
    output: {
        path: __dirname + "/editor/assets",
        filename: "bundle.js"
    },
    devtool: 'source-map'
}