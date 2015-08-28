//process.env.JSONQRY_EDITOR = 'yes';//DEBUG
/**
* Query server for api.mcjson.com
*/
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var express = require('express');
var jsonqry = require('./util/jsonqry');
var morgan = require('morgan')
var responseTime = require('response-time')
var bodyParser = require('body-parser');
var cors = require('cors');
//Init app and settings
var app = express();
var dataIndex = JSON.parse(fs.readFileSync("data.json"));
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
app.use(require('./util/limitticket')({maxTickets:150}));

if(dev){
    app.use(responseTime())
    app.use(morgan('combined'));
}

app.use('/v1/',express.static('data',{maxAge:3600000}));

if(editorEnabled){
    app.use(express.static('editor'));
}

var mounted = [];
fs.readdir(baseDataDir, function(err,mounts){
    mounts.forEach(function(mount){
        fs.stat('./data/' + mount,function(err,stats){
            if(err) { throw err;}
            if(stats.isDirectory()){
                jsonHnd = jsonqry('./data/' + mount,dataIndex[mount],'/v1/' + mount);
                mounted.push(jsonHnd);
                console.log("mounting",mount)
                app.get(new RegExp('/v1/' + mount + '/.*'), jsonHnd);
            }
        });
    });
    
});
jsonHandler = {
    reload: function(){ 
        mounted.forEach(function(e){
            e.reload()
        });
    }
}

if(editorEnabled){
    editorAPI = express.Router();
    editorAPI.use(bodyParser.json());
    editorAPI.put(/.*/,function(req,res){

        var file = path.join(baseDataDir,require('url').parse(req.url).pathname);
        if(file.indexOf(baseDataDir) != 0){
            res.send(500).end('BAD BASE DIR');;
        }
        oldFile = path.join(
                baseDelDir, 
                file.substr(baseDataDir.length) + 
                '.' + 
                Math.floor(Date.now()/1000)
            );
        mkdirp(path.dirname(oldFile),function(err){
            if(err) { 
                    console.log("mkdir",err);
                    res.sendStatus(500).end(err);
                    return;
                }
            fs.rename(
                file,
                oldFile,
                function(err){
                if(err) { 
                    console.log("rename",err);
                    res.sendStatus(500).end(err);
                }else{
                    //TODO : Implement patching.
                    fs.readFile(oldFile, function(err,data){
                        if(err) { 
                            console.log("readfile",err);
                            res.sendStatus(500).end(err);
                        }else{
                            data = JSON.parse(data);
                            for(x in req.body){
                                data[x] = req.body[x];
                            }
                            fs.writeFile(file,JSON.stringify(data, null, 2),function(err,written){
                                if(err) { 
                                    console.log("writefile",err);
                                    res.sendStatus(500).end(err);
                                }else{
                                    res.sendStatus(200);
                                    jsonHandler.reload();
                                }
                            });
                        }
                    })
                    
                }
            });
        });

        
    });
    editorAPI.delete(/.*/, function(req,res){
        var file = path.join(baseDataDir,require('url').parse(req.url).pathname);
        console.log("BYE",file);
        if(file.indexOf(baseDataDir) != 0){
            res.sendStatus(500).end('BAD BASE DIR');
            return;
        }
        delFile = path.join(
                baseDelDir, 
                file.substr(baseDataDir.length) + 
                '.' + 
                Math.floor(Date.now()/1000)
            );
        mkdirp(path.dirname(delFile),function(){
            fs.rename(
                file,
                delFile,
                function(err){
                if(err) { 
                    res.sendStatus(500).end(err);
                }else{
                    res.sendStatus(200);
                    jsonHandler.reload();
                }
            });
        });
    });
    
    app.use('/v1/',editorAPI);
}

var server = app.listen(process.env.PORT || 80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('JSONQRY listening at http://%s:%s', host, port);
  if(editorEnabled){
    console.warn('STARTED IN EDITOR MODE, DATABASE WRITABLE');
    console.warn('REMOVE JSONQRY_EDITOR=YES TO DISABLE WRITES');
  }
});