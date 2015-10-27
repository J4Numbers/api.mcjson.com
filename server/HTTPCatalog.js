var express = require('express');
var semver = require('semver');
var bodyParser = require('body-parser');


module.exports = function(db, struct){

	function queryFilter(filtered, query){
		var keys = Object.keys(struct);
		keys.forEach(function(key){
            if(!query[key]) { return; } //Skip if not specified.
            switch(struct[key]){
                case "eq": //Straight up equality test
                filtered = filtered.filter((e) => { return (key in e) && e[key].toLowerCase() == query[key].toLowerCase(); });
                break;
                case "str": //anywhere search string
                filtered = filtered.filter((e) => { return (key in e) && e[key].toLowerCase().indexOf(query[key].toLowerCase()) != -1; });
                break;
                case "aeq": //Key in array, must fully exist
                filtered = filtered.filter((e) => { 
                    return (key in e) && e[key].map( (i)=>{return i.toLowerCase();} ).indexOf(query[key].toLowerCase()) != -1; });
                break;
                case "arr": //Key in array, partial match
                filtered = filtered.filter((e) => { 
                    return (key in e) && e[key].filter( (i)=>{return i.toLowerCase().indexOf(query[key].toLowerCase()) != -1; } ).length > 0;
                });
                break;
                case "pre": //Prefix string check
                filtered = filtered.filter((e) => { return (key in e) && e[key].toLowerCase().indexOf(query[key].toLowerCase())==0; });
                break;
                case "ver": //Semver check
                filtered = filtered.filter((e) => { return (key in e) && semver.satisfies(e[key], query[key]); });
                break;
            }
        });
		return filtered;
	}

	var router = express.Router();

	router.get('/', function(req,res){
		//Allow querying for items
		res.setHeader('Cache-Control', 'public, max-age=3600');
		res.json(queryFilter(db.catalog.map((f)=>f.data), req.query));
	});

	router.get('/:mod', function(req,res){
		//List all items under a mod with querying
		res.setHeader('Cache-Control', 'public, max-age=3600');
		res.json(queryFilter(db.catalog.filter((f)=>f.data.mod == req.params.mod).map((f)=>f.data), req.query));
	});

	router.get('/:mod/:id', function(req, res){
		//List a single item
		var fltrd = db.catalog.filter((f)=>f.data.mod == req.params.mod && f.data.id == req.params.id).map((f)=>f.data);
		if(fltrd.length){
			res.setHeader('Cache-Control', 'public, max-age=3600');
			res.json(fltrd[0]);
		}else{
			res.send(404);
		}
	});

if(process.env.JSONQRY_EDITOR == 'true'){
	router.put('/:mod/:id', [bodyParser.json()], function(req,res){
		if(req.body.mod != req.params.mod || req.body.id != req.params.id){
			res.send(400);
			return;
		}

		var fltrd = db.catalog.filter((f)=>f.data.mod == req.params.mod && f.data.id == req.params.id);
		if(fltrd.length){
			fltrd[0].data = req.body;
			fltrd[0].save();
			res.sendStatus(200);
		}else{
			db.add(req.body);
			res.sendStatus(200);
		}
	});

	router.post('/:mod/:id', [bodyParser.json()], function(req,res){
		if(req.body.mod != req.params.mod || req.body.id != req.params.id){
			res.send(400);
			return;
		}
		var fltrd = db.catalog.filter((f)=>f.data.mod == req.params.mod && f.data.id == req.params.id);
		if(fltrd.length === 0){
			db.add(req.body);
			res.sendStatus(200);
		}else{
			res.sendStatus(405);
		}
	});
}
	return router;
};