"use strict";
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

function touchDir(file){
	mkdirp.sync(path.dirname(file));
}

function walk(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

var catalogEntryCatalog = new WeakMap();

class CatalogEntry {
	constructor(file){
		this.file = file;
		var load = false;
		try{ 
			fs.statSync(this.file);
			load = true;
		}catch(e){

		}
		if(load){
			this.data = JSON.parse(fs.readFileSync(this.file));
		}
	}

	save(){
		touchDir(this.file);
		fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2));
	}

	delete(){
		var catalog = catalogEntryCatalog.get(this);
		var delFile = path.join(catalog.deletedDir, catalog.fng(this.data));
		touchDir(delFile);
		fs.renameSync(
			this.file,
			delFile
			);
		if(catalog.catalog.indexOf(this) !== -1){
			catalog.catalog.splice(catalog.catalog.indexOf(this), 1);
		}
		
	}
}

class Catalog {
	constructor(dir, deletedDir, filenameGen, cb){
		this.dir = dir;
		this.deletedDir = deletedDir;
		this.catalog = [];
		this.fng = filenameGen;
		this.load(cb);
	}

	load(cb){
		walk(this.dir, (err, list)=>{
			this.catalog = list.map((file) =>{
				var ce = new CatalogEntry(file);
				catalogEntryCatalog.set(ce, this);
				return ce;
			});
            cb && cb();
		});
	}

	add(data){
		var ce = new CatalogEntry(path.join(this.dir, this.fng(data)))
		catalogEntryCatalog.set(ce, this);
		ce.data = data;
		ce.save();
		this.catalog.push(ce);
	}

}

module.exports.CatalogEntry = CatalogEntry;
module.exports.Catalog = Catalog;