// The root provides a resolver function for each API endpoint
const path = require('path');
const Database = require("./jfdb.js");
const VersionedDatabase = require("./jfvdb.js");
const semver = require("semver");
const fnFile = data => `${data.mod}/${data.id}.json`;

const versionDB = new Database(path.resolve("./data/versions"),  data => `${data.id}.json`)
const meta = {
        version: {
            latest: semver.maxSatisfying(versionDB.data().map( v => v.version),"*"),
            latestRelease: semver.maxSatisfying(versionDB.data().filter(v => v.type== "RELEASE").map( v => v.version),"*"),
            latestSnapshot: semver.maxSatisfying(versionDB.data().filter(v => v.type== "SNAPSHOT").map( v => v.version),"*"),
            mapping: versionDB.data().reduce( (out, v) =>{
                out[v.id] = v.version;
                return out;
            },{})
        }
    }

const fnVersion =  v => meta.version.mapping[v.version].split("-")[0];

module.exports = {
    itemDB: new VersionedDatabase(path.resolve("./data/items"), fnFile, fnVersion),
    enchantmentDB: new VersionedDatabase(path.resolve("./data/enchantments"), fnFile, fnVersion ),
    entityDB: new Database(path.resolve("./data/entities"), fnFile),
    effectDB: new Database(path.resolve("./data/status_effect"), fnFile),
    versionDB: versionDB,
    meta: meta
}