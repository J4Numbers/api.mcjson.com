var semver = require('semver');
var path = require('path');
var fs = require('fs');
const DATA_DIR = path.normalize(process.cwd() + '/data/versions');
var fetch = require("fetch").fetchUrl;

const MANIFEST_URL = "https://launchermeta.mojang.com/mc/game/version_manifest.json";

function _objValues(obj){
    return Object.keys(obj).map((k)=>obj[k]);
}

function padVersion(ver){
    var parts = ver.split(".");
    while(parts.length < 3){
        parts.push("0");
    }
    return parts.join(".");
}


//Fetch data
console.log(`Importing data from ${MANIFEST_URL}`);
fetch(MANIFEST_URL, function(error, meta, body){
	//Fail on fetch error
	if(error){
        console.error("Failed to fetch json");
		console.error(error);
		process.exit(1);
	}
	let badId = /\d{1,}\.\d{1,}\.\d{1,}\-(\d{2}w\d{1,}.)/
	let existingIds = fs.readdirSync(DATA_DIR).map( f => f.replace(".json",""));
	existingIds.forEach( i => {
		
		console.log("processing ",i);
		let versionData = JSON.parse(fs.readFileSync(DATA_DIR + "/" + i + ".json","ascii"));

		let newFormat = {
			id: badId.test(i) ? i.match(badId)[1] : i,
			version: versionData.id,
			type: versionData.type,
			released: versionData.released,
			mod: versionData.mod
		}


		fs.writeFileSync(DATA_DIR + "/" + i + ".json", JSON.stringify(newFormat , null, 2));
		if(badId.test(i)){
			let newId = i.match(badId)[1];
			fs.rename(DATA_DIR + "/" + i + ".json", DATA_DIR + "/" + newId + ".json")
		}
	})
	process.exit(0)
		//parse versions
	var versionData = JSON.parse(body);

	//Only find snapshots and releases
	var filteredData = versionData.versions
	.filter(function(e){ return ['release','snapshot'].indexOf(e.type) !== -1})
	.map(function(e){
		//Patch bad version numbers to semver major.minor.patch format
                console.log(e);
		if(e.id.split(".").length == 2){
			console.log("patching",e.id);
			e.id = padVersion(e.id);
		}
		//Convert release time for sorting.
		e.time = new Date(e.releaseTime);
        return e;
	});

	//Find the earliest version of each release (the 1.x.0's in most cases,)
	//And store for use in snapshot semver fixing.
    console.log(filteredData);
	var releasesOnly = filteredData.filter(function(e){ return e.type == 'release';})
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
	},{});

	//Dump out all versions to the filesystem
	var versionEntries = filteredData
	.filter(function(e){ return !e.__future_version__;}) //EXCLUDE OUR VERSION WE MADE FOR SNAPSHOT
	.map(function(e){
		//Fix snapshot versions to major.minor.patch-snapshot format.
		var versionId = e.id;
		if(!semver.valid(versionId) && e.type == 'snapshot'){
			var versionsAbove = _objValues(releasesOnly)
                                    .map(function(m){
                                        return {id:m.id,time:m.time};
                                    })
                                    .filter(function(f){
                                        return f.time > e.time
                                    })
                                    .sort(function(a,b){
                                        if(a.time < b.time){
                                            return -1;
                                        }else if(a.time < b.time){
                                            return 1;
                                        }else{
                                            return 0;
                                        }
                                    })
                                    [0]
			versionId = versionsAbove.id + "-" +  versionId;
			console.log("Fixing broken version.",e.id,'->',versionId);
		}

		//Construct a new version record
		return {
			id: versionId,
			mod: 'minecraft',
			type: e.type.toUpperCase(),
			released: e.time
		}
	}).reduce(function(out, i){
        out.push(i);
        out.sort(function(a,b){
            if(a.time == b.time){
                return 0;
            }
            if(a.time > b.time){
                return 1;
            }else{
                return -1;
            }
        });
        return out;
    },[]).forEach(function(e,idx,col){ //Sort by time released.
		if(idx > 0){
			if(semver.lt(col[idx-1].id,e.id)){
				//Check for release time weirdness
				console.error("temporal oddity detected",col[idx-1].id,"released after",e.id);
			}
		}
		//If file doesn't exist, write to disk.
		try{
			fs.statSync(DATA_DIR + '/versions/' + e.id + '.json');
		}catch(x){
			console.log("Storing new version", e.id);
			fs.writeFileSync(DATA_DIR + '/versions/' + e.id + '.json',JSON.stringify(e,null,4));
		}
	})
	
});
