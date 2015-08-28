var semver = require('semver');
var path = require('path');
var fs = require('fs');
var dataDir = path.normalize(process.cwd() + '/data/');
var fetch = require("fetch").fetchUrl;
var _ = require("lodash");

//Initialize base directory
try{
fs.mkdirSync(dataDir + '/versions/');
}catch(e){}

//Fetch data
console.log("Importing data from http://s3.amazonaws.com/Minecraft.Download/versions/versions.json");
fetch("http://s3.amazonaws.com/Minecraft.Download/versions/versions.json", function(error, meta, body){
	//Fail on fetch error
	if(error){
		console.error(error);
		process.exit(1);
	}

	//parse versions
	var versionData = JSON.parse(body);

	//Make a magic future version as a basis for any snapshots.
	versionData.versions.push({

      "id": semver.inc(versionData.latest.release,"minor"),
      "time": (function(){now = new Date();now.setDate(now.getDate() + 365);return now.toUTCString()})(),
      "releaseTime": (function(){now = new Date();now.setDate(now.getDate() + 365);return now.toUTCString()})(),
      "type": "release",
      "__future_version__": true //DO NOT REMOVE, USED TO HIDE RELEASE FROM BEING OUTPUT
    });

	//Only find snapshots and releases
	var filteredData = _(versionData.versions)
	.filter(function(e){ return ['release','snapshot'].indexOf(e.type) !== -1})
	.each(function(e){
		//Patch bad version numbers to semver major.minor.patch format
		if(e.id.split(".").length == 2){
			console.log("patching",e.id);
			e.id = e.id + '.0';
		}
		//Convert release time for sorting.
		e.time = new Date(e.releaseTime);
	})
	.value()

	//Find the earliest version of each release (the 1.x.0's in most cases,)
	//And store for use in snapshot semver fixing.
	var releasesOnly = _.chain(filteredData)
	.filter(function(e){ return e.type == 'release';})
	.reduce(function(acc,e){
		var id = e.id.split(".");
		var minorVersion = id[0] + '.' + id[1];
		if(
			!acc[minorVersion] ||
			(
				acc[minorVersion] &&
				parseInt(acc[minorVersion].id.split(".")[2]) > parseInt(id[2])
			)
			){
			acc[minorVersion] = e;
		}
		return acc
	},{})
	.values()
	.value();

	//Dump out all versions to the filesystem
	var versionEntries = _(filteredData)
	.filter(function(e){ return !e.__future_version__;}) //EXCLUDE OUR VERSION WE MADE FOR SNAPSHOT
	.map(function(e){
		//Fix snapshot versions to major.minor.patch-snapshot format.
		var versionId = e.id;
		if(!semver.valid(versionId) && e.type == 'snapshot'){
			var versionsAbove = _(releasesOnly).map(function(m){return {id:m.id,time:m.time};}).filter(function(f){return f.time > e.time}).sortBy("time").first();
			versionId = versionsAbove.id + "-" +  versionId;
			console.log("Fixing broken version.",e.id,'->',versionId);
		}

		//Construct a new version record
		return {
			id: versionId,
			type: e.type,
			released: e.time
		}
	}).sortBy("time").each(function(e,idx,col){ //Sort by time released.
		if(idx > 0){
			if(semver.lt(col[idx-1].id,e.id)){
				//Check for release time weirdness
				console.error("temporal oddity detected",col[idx-1].id,"released after",e.id);
			}
		}
	}).each(function(e){
		//If file doesn't exist, write to disk.
		try{
			fs.statSync(dataDir + '/versions/' + e.id + '.json');
		}catch(x){
			console.log("Storing new version", e.id);
			fs.writeFileSync(dataDir + '/versions/' + e.id + '.json',JSON.stringify(e,null,4));
		}
	}).value();
	
});