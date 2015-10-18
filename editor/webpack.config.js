var path = require('path');
module.exports = {
	resolve: {
		root: ['./js/app'].map((p)=>path.resolve(p)),
		fallback: ['./js/app'].map((p)=>path.resolve(p)),
		alias: {
			mvc: path.resolve('./js/mvc')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
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
        path: __dirname + "/assets",
        filename: "bundle.js"
    },
    devtool: 'source-map'
}