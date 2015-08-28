var path = require('path');
var fs = require('fs');
var dataDir = path.normalize(process.cwd() + '/data/');
var fetch = require("fetch").fetchUrl;
var _ = require("lodash");
console.log("Importing data from http://minecraft-ids.grahamedgecombe.com/");

fetch("http://minecraft-ids.grahamedgecombe.com/items.json", function(error, meta, body){
	if(error){
		console.error(error);
		process.exit(1);
	}
	var blockItemData = JSON.parse(body);

	var newData = _.chain(blockItemData)
	.filter(function(e){return e.type < 256})
	.map(function(entry){ //Construct block object data
		var _e = {
			mod: "minecraft",
			id: entry.text_type,
			name: entry.name,
			"technical": false,
			"introduced_at":"1.9.0",
			"changed_at":"1.9.0",
			"meta":{
				"meta":{}
			}
		};
		_e.meta.meta[entry.name] = entry.meta;
		return _e;
	}).reduce(function(r, n){
		if(r[n.id]){
			//Map new meta values
			for(x in n.meta.meta){
				r[n.id].meta.meta[x] = n.meta.meta[x];
			}
		}else{
			r[n.id] = n;
		}
		return r;
	},{})
	.each(function(entry){
		var entryPath = path.normalize(dataDir + '/blocks/minecraft/' + entry.id + '.json');

		try{
		   var stats = fs.statSync(entryPath);
	    }catch(e){
	    	entry.name = _.intersection.apply(null,_.map(Object.keys(entry.meta.meta),function(e){return e.split(" ");})).join(" ") || entry.name;
	    	console.log("NEW BLOCK",entry.name);
	    	fs.writeFileSync(entryPath, JSON.stringify(entry,null,2));
	    }
	})
	.value();
	console.log("Blocks", _.size(newData));

	//Item data
	var newData = _.chain(blockItemData)
	.filter(function(e){return e.type > 255})
	.map(function(entry){ //Construct block object data
		var _e = {
			mod: "minecraft",
			id: entry.text_type,
			name: entry.name,
			"technical": false,
			"introduced_at":"1.9.0",
			"changed_at":"1.9.0",
			"meta":{
				"meta":{}
			}
		};
		_e.meta.meta[entry.name] = entry.meta;
		return _e;
	}).reduce(function(r, n){
		if(r[n.id]){
			//Map new meta values
			for(x in n.meta.meta){
				r[n.id].meta.meta[x] = n.meta.meta[x];
			}
		}else{
			r[n.id] = n;
		}
		return r;
	},{})
	.each(function(entry){
		var entryPath = path.normalize(dataDir + '/items/minecraft/' + entry.id + '.json');
		try{
		   var stats = fs.statSync(entryPath);
	    }catch(e){
	    	entry.name = _.intersection.apply(null,_.map(Object.keys(entry.meta.meta),function(e){return e.split(" ");})).join(" ") || entry.name;
	    	console.log("NEW ITEM",entry.name);
	    	fs.writeFileSync(entryPath, JSON.stringify(entry,null,2));
	    }
	})
	.value();
	console.log("Blocks", _.size(newData));
});


fetch("http://minecraft-ids.grahamedgecombe.com/entities.tsv", function(error, meta, body){
	if(error){
		console.error(error);
		process.exit(1);
	}
	_(body.toString().split("\n"))
	.each(function(e){
		line = e.split("\t");
		entry= {
			id:line[2],
			name:line[1],
			mod:"minecraft",
			introduced_at:"1.9.0",
			changed_at:"1.9.0"
		};
		if(!entry.id){return;}
		var entryPath = path.normalize(dataDir + '/entities/minecraft/' + entry.id + '.json');
		try{
		   var stats = fs.statSync(entryPath);
	    }catch(e){
	    	console.log("NEW ENTITY",entry.name);
	    	fs.writeFileSync(entryPath, JSON.stringify(entry,null,2));
	    }	
	})
	.value()
})