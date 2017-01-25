var semver = require('semver');
var path = require('path');
var fs = require('fs');
const DATA_DIR = path.normalize(process.cwd() + '/data/versions');
var fetch = require('node-fetch');

const MANIFEST_URL = "https://launchermeta.mojang.com/mc/game/version_manifest.json";

function padVersion(ver) {
	var parts = ver.split(".");
	while (parts.length < 3) {
		parts.push("0");
	}
	return parts.join(".");
}


//Fetch data
console.log(`Importing data from ${MANIFEST_URL}`);
fetch(MANIFEST_URL).then( res => res.json()).then( versionData => {

	//Load existing ids
	let existingIds = fs.readdirSync(DATA_DIR).map(f => f.replace(".json", ""));
	//Load release dates for calculation.
	let existingTimes = existingIds
		.filter(id => semver.valid(id) != null)
		.reduce((m, id) => {
			m[id] = new Date(JSON.parse(fs.readFileSync(DATA_DIR + "/" + id + ".json", "ascii")).released)
			return m;
		}, {})

	let nextVersionGuess = semver.inc(semver.maxSatisfying(
		existingIds.filter(id => semver.valid(id) != null),
		"*"), "minor");


	//Search all versions, find one with closest +Delta (nearest one ahead of.)
	function findNextVersion(a) {
		let at = new Date(a)
		diff = at.getTime();
		return existingIds
		.filter(id => semver.valid(id) != null)
		.reduce((cur, guess) => {
			let newDiff = existingTimes[guess] - at;
			if (newDiff < diff && newDiff > 0) {
				diff = newDiff;
				return guess;
			} else {
				return cur;
			}
		}, nextVersionGuess);
	}

	//Filter and process records
	versionData.versions
		.filter(entry => ['release', 'snapshot'].indexOf(entry.type) !== -1)
		.filter(entry => existingIds.indexOf(entry.id) == -1)
		.map(entry => {

			let newFormat = {
				id: entry.id,
				version: semver.valid(entry.id) == null && entry.type == "snapshot" ? findNextVersion(entry.releaseTime) + "-" + entry.id : padVersion(entry.id),
				type: entry.type,
				released: entry.releaseTime,
				mod: "minecraft"
			}

			console.log(newFormat);

			fs.writeFileSync(
				DATA_DIR + "/" + newFormat.id + ".json",
				JSON.stringify(
					newFormat,
					null,
					2
				)
			);

		})
})
.catch( error =>{
		console.error("Failed to fetch json");
		console.error(error);
		process.exit(1);
});
