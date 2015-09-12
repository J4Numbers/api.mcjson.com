/**
* Provides connect middleware to provide simple querying 
* for a directory of json documents.
* Also provides a method to reload the index dynamically
*/
var walk = require('./dir-walk.js');
var fs = require('fs');
var semver = require('semver');

module.exports = function(dir, struct, baseUrl){
    //Load files
    console.log("loading",baseUrl);
    var keys = Object.keys(struct);
    var index = [];
    var handler = function(req, res, next){
        var url = require('url').parse(req.url).pathname;
        var filtered = index.filter(function(e){return e.url.indexOf(url) == 0;})
        keys.forEach(function(key){
            if(!req.query[key]) { return; } //Skip if not specified.
            switch(struct[key]){
                case "eq": //Straight up equality test
                filtered = filtered.filter(function(e){ return (key in e) && e[key].toLowerCase() == req.query[key].toLowerCase(); });
                break;
                case "str": //anywhere search string
                filtered = filtered.filter(function(e){ return (key in e) && e[key].toLowerCase().indexOf(req.query[key].toLowerCase()) != -1; });
                break;
                case "aeq": //Key in array, must fully exist
                filtered = filtered.filter(function(e){ 
                    return (key in e) && e[key].map(function(i){return i.toLowerCase();}).indexOf(req.query[key].toLowerCase()) != -1; });
                break;
                case "arr": //Key in array, partial match
                filtered = filtered.filter(function(e){ 
                    return (key in e) && e[key].map(function(i){return i.toLowerCase().indexOf(req.query[key].toLowerCase()) != -1; }).reduce(function(p,r){return p || r;},false);
                });
                break;
                case "pre": //Prefix string check
                filtered = filtered.filter(function(e){ return (key in e) && e[key].toLowerCase().indexOf(req.query[key].toLowerCase())==0; });
                break;
                case "ver": //Semver check
                filtered = filtered.filter(function(e){ return (key in e) && semver.satisfies(e[key], req.query[key]); });
                break;
            }
        })
        //Only send values which have a valid index filter.
        if(req.query.idxOnly){
            idxKeys = keys.filter(function(k){return struct[k];});
            filtered = filtered.map(function(e){
                var o = {};
                idxKeys.forEach(function(k){
                    o[k] = e[k];
                });
                return o;
            })
        }
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.json(filtered);
    }
    handler.reload = function(){
        walk(dir,function(err, results){
        if(err) { throw err; }
        
        index = results.map(function(e){
            try{
                var data = JSON.parse(fs.readFileSync(e));
                var res = {
                    url: baseUrl + e.substr(dir.length)
                };
                keys.forEach(function(key){
                    res[key] = data[key];
                });
                return res;
            }catch(err){
                console.error("Failed to load", e);
                throw err;
            }
        });

    })
    }
    handler.reload();//Inital load
    return handler;
}