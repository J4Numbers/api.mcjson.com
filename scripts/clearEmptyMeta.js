/**
Clears empty (single) meta entries
*/
var Catalog = require("../server/catalog").Catalog;
var fs = require("fs");
var path = require("path");
var baseDataDir = path.join(process.cwd(),'data');
var baseDelDir = path.join(process.cwd(),'_deleted_');
var dataIndex = require("../catalog.config.js");

fs.readdir(baseDataDir, function(err,mounts){
    mounts.forEach(function(mount){
        fs.stat(path.join(baseDataDir, mount),function(err,stats){
            if(err) { throw err;}
            if(stats.isDirectory()){
                var catalog = new Catalog( 
                        path.join(baseDataDir, mount), 
                        path.join(baseDelDir, mount) , 
                        dataIndex[mount].fn || ((d)=>`${d.mod}/${d.id}.json`),
                        function(){
                            catalog.catalog.forEach((entry)=>{
                                if(
                                    entry.data.meta && 
                                    entry.data.meta.meta &&
                                    Object.keys(entry.data.meta.meta).length == 1
                                ){
                                    entry.data.meta = {};
                                    console.log("Updating", entry.file);
                                    entry.save();
                                }
                            });
                        }
                    )

            }else{
                console.log(path.join(baseDataDir, mount),"no dir");
            }
        });
    });
    
});