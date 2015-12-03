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
var dataIndex = require("./catalog.config.js");
var dev = process.env.NODE_ENV != 'production';
var editorEnabled = process.env.JSONQRY_EDITOR == 'true';
//Build dirs
var baseDataDir = path.join(process.cwd(),'data');
var baseDelDir = path.join(process.cwd(),'_deleted_');
[baseDataDir,baseDelDir].forEach(function(dir){
    fs.stat(dir,function(err,stat){
        if(err){
            mkdirp(dir);
        }else if(!stat.isDirectory()){
            throw new Error("["+ dir + "] is not a directory.");
        }
    })
});

app.use(cors());
app.use(require('./limitticket')({maxTickets:150}));

if(dev){
    app.use(responseTime())
    app.use(morgan('combined'));
}

app.use('/v1/',express.static('data',{maxAge:3600000}));

if(editorEnabled){
    app.use(express.static('editor'));
}

var Catalog = require('./catalog').Catalog;
var HTTPCatalog = require('./HTTPCatalog');

var mounted = [];
fs.readdir(baseDataDir, function(err,mounts){
    mounts.forEach(function(mount){
        fs.stat('./data/' + mount,function(err,stats){
            if(err) { throw err;}
            if(stats.isDirectory()){
                var httpCatalog = new HTTPCatalog(
                    new Catalog( 
                        path.join(baseDataDir, mount), 
                        path.join(baseDelDir, mount) , 
                        dataIndex[mount].fn || ((d)=>`${d.mod}/${d.id}.json`)
                    ),
                    dataIndex[mount].struct
                );
                console.log("mounting", mount)
                app.use(`/v1/${mount}`, httpCatalog);
            }
        });
    });
    
});

var server = app.listen(process.argv[2] || process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('JSONQRY listening at http://%s:%s', host, port);
  if(editorEnabled){
    console.warn('STARTED IN EDITOR MODE, DATABASE WRITABLE');
    console.warn('REMOVE JSONQRY_EDITOR=YES TO DISABLE WRITES');
  }
});