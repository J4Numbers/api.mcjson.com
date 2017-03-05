const path = require("path");
const fs = require("fs");
const mkdirp = require('mkdirp');

const semver = require("semver");

const SYM_PATH_FUNC = Symbol();
const SYM_VER_FUNC = Symbol();
const SYM_DATA = Symbol();
/**
 * Database of JSON files
 */
class Database {
    /**
     * @param {string} baseDir base directory for all files.
     * @param {Function} function that transforms an object into a relative path to store at.
     */
    constructor(baseDir, pathFunction, verFunction) {
        this.baseDir = path.resolve(baseDir);
        this[SYM_PATH_FUNC] = pathFunction;
        this[SYM_VER_FUNC] = verFunction;
        this[SYM_DATA] = {};
        this.load();
    }

    clear() {
        this[SYM_DATA] = {};
    }
    data() {
        return this[SYM_DATA];
    }

    /**
     * Filter data() against a semver string
     * @param {String} v semver version to compare
     */
    query(v){
        let data = this[SYM_DATA];
        return Object.keys(data).map(k => data[k]).map( entries => {
            let versions = entries.map( this[SYM_VER_FUNC] );
            let ver = semver.maxSatisfying(versions, v);
            return entries.find( e => this[SYM_VER_FUNC](e) == ver);
        }).filter( e => e != null && !e.__removed );
    }

    /**
     * Loads data from a directory
     * recursivly pulls in data
     */
    load(dir) {
        let d = dir || this.baseDir;
        let files = fs.readdirSync(d);
        files.forEach(file => {
            let fName = path.resolve(d, file);
            let f = fs.statSync(fName)
            if (f.isDirectory()) {
                this.load(fName);
            } else if (f.isFile()) {
                let body = fs.readFileSync(fName, "ascii")
                try {
                    let data = JSON.parse(body)
                    this[SYM_DATA][this[SYM_PATH_FUNC](data[0])] = data;
                } catch (e) {
                    console.error("Could not parse file as JSON", fName, err);
                    process.exit(-1);
                }
            }
        })
    }

    

    /**
     * Saves to database, and deletes old record if found.
     * @param {object} data data to save
     * @param {object} oldData record to delete
     */
    save(data) {
        let file = this[SYM_PATH_FUNC](data);
        if(!this[SYM_DATA][file]){
            this[SYM_DATA][file] = [];
        }
        let idx = (this[SYM_DATA][file] || []).findIndex( e => e.version == data.version )
        if (idx != -1) {
            this[SYM_DATA][file].splice(idx, 1, data);
        } else {
            this[SYM_DATA][file].push(data);
        }

        let p = path.resolve(this.baseDir, file);
        if (p.indexOf(this.baseDir) !== 0) {
            throw new Error(`Invalid filepath, exits baseDir [${p}]`);
        }
        mkdirp(path.dirname(p), err => {
            fs.writeFile(p, JSON.stringify(this[SYM_DATA][file], null, 2));
        });
    }

    /**
     * Delete record
     */
    remove(data) {
        let file = this[SYM_PATH_FUNC](data);
        let idx = (this[SYM_DATA][file] || []).findIndex( e => e.version == data.version)

        if (idx != -1) {
            this[SYM_DATA][file].splice(idx, 1);
        }

        let p = path.resolve(this.baseDir, file);
        if (p.indexOf(this.baseDir) !== 0) {
            throw new Error(`Invalid filepath, exits baseDir [${p}]`);
        }
        mkdirp(path.dirname(p), err => {
            fs.writeFile(p, JSON.stringify(this[SYM_DATA][file], null, 2));
        });
    }

    unlink(data){
        let file = this[SYM_PATH_FUNC](data);
        delete this[SYM_DATA][file];
        let p = path.resolve(this.baseDir, file);
        if (p.indexOf(this.baseDir) !== 0) {
            throw new Error(`Invalid filepath, exits baseDir [${p}]`);
        }
        fs.unlink(p);
    }
}

/**
 * Quick file key generator
 * Pass in array of props to generate a path using/each/prop.json
 * @param {string[]} props property names to use for path.
 */
Database.QuickKey = props => d => `${props.map(k => d[k]).join("/")}.json`;
module.exports = Database;