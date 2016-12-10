//process.env.JSONQRY_EDITOR = 'yes';//DEBUG
/**
* Query server for api.mcjson.com
*/
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var express = require('express');
var morgan = require('morgan')
var responseTime = require('response-time')
var cors = require('cors');
//Init app and settings
var app = express();

app.use(cors());

if(process.env.NODE_ENV == 'production'){
    app.use(require('./limitticket')());
}


if (process.env.NODE_ENV != 'production') {
    app.use(responseTime())
    app.use(morgan('common'));
}

if (process.env.NODE_ENV != 'production') {
    var webpack = require("webpack");
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var config = require('../webpack.config.js');
    var compiler =  webpack(config);
    app.use(webpackDevMiddleware(
        compiler,
        {
            publicPath: config.output.publicPath,
            stats:{colors:true}
        }
    ));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }))
}

app.use ('/', require("./graph.js"));

// app.use((req,res)=>{
//     res.status(404).send({error:"no path"});
// })

var server = app.listen(process.argv[2] || process.env.PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('JSONQRY listening at http://%s:%s', host, port);
    if (process.env.NODE_ENV != 'production') {
        console.warn('STARTED IN DEVELOPMENT MODE, DATABASE WRITABLE');
        console.warn('RUN WITH NODE_ENV=production TO DISABLE WRITES');
    }
});