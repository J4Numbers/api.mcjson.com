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
var dataIndex = require("../catalog.config.js");
var editorEnabled = process.env.JSONQRY_EDITOR == 'true';
//Build dirs
var baseDataDir = path.join(process.cwd(), 'data');
var baseDelDir = path.join(process.cwd(), '_deleted_');
[baseDataDir, baseDelDir].forEach(function (dir) {
    fs.stat(dir, function (err, stat) {
        if (err) {
            mkdirp(dir);
        } else if (!stat.isDirectory()) {
            throw new Error("[" + dir + "] is not a directory.");
        }
    })
});

app.use(cors());

//app.use(require('./limitticket')({maxTickets:150}));

if (process.env.NODE_ENV != 'production') {
    app.use(responseTime())
    app.use(morgan('combined'));
}

if (editorEnabled) {
    app.use('/editor/', express.static('public'));
}
var HTTPCatalog = require('./HTTPCatalog');

var mounted = {};
Object.keys(dataIndex).forEach(function (mount) {
    var stats = fs.statSync('./data/' + mount);
        if (stats.isDirectory()) {
            var httpCatalog = HTTPCatalog({
                dir: path.join(baseDataDir, mount), //Directory to search in
                delDir: path.join(baseDelDir, mount), //Directory to move files to when deleted.
                enabledModId: !dataIndex[mount].noModId, //Enable /mod and /mod/id routes
                enableSave: editorEnabled, //Enable saving files
                fileNameGen: dataIndex[mount].fn, //File name generator to use
                struct: dataIndex[mount].struct
            });
            console.log("mounting", mount)
            app.use(`/v1/${mount}`, httpCatalog);
            mounted[mount] = httpCatalog;
        }
});

app.use ('/graphql', require("./graph.js"));

app.use((req,res)=>{
    res.status(404).send({error:"no path"});
})

var server = app.listen(process.argv[2] || process.env.PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('JSONQRY listening at http://%s:%s', host, port);
    if (editorEnabled) {
        console.warn('STARTED IN EDITOR MODE, DATABASE WRITABLE');
        console.warn('REMOVE JSONQRY_EDITOR=YES TO DISABLE WRITES');
    }
});