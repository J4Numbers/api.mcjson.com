const path = require("path");
const fs = require("fs");
const mkdirp = require('mkdirp');

const SYM_PATH_FUNC = Symbol();
const SYM_DATA = Symbol();
/**
 * Database of JSON files
 */
class Database {
    /**
     * @param {string} baseDir base directory for all files.
     * @param {Function} function that transforms an object into a relative path to store at.
     */
    constructor(baseDir, pathFunction) {
        this.baseDir = path.resolve(baseDir);
        this[SYM_PATH_FUNC] = pathFunction;
        this[SYM_DATA] = [];
        this.load();
        this.gql = {
            save: (_, { data }) => this.save(data),
            delete: (_, { oldId }) => this.unlink(oldId)
        }
    }

    clear() {
        this[SYM_DATA] = [];
    }
    data() {
        return this[SYM_DATA];
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
                    this[SYM_DATA].push(JSON.parse(body));
                } catch (e) {
                    console.error("Could not parse file as JSON", fName, err);
                    process.exit(-1);
                }
            }
        })
    }

    /**
     * Finds a matching record index by matching the path
     */
    _indexByPath(data) {
        let match = this[SYM_PATH_FUNC](data);
        return this[SYM_DATA].map(d => this[SYM_PATH_FUNC](d)).findIndex(m => m == match);
    }

    /**
     * Saves to database, and deletes old record if found.
     * @param {object} data data to save
     * @param {object} oldData record to delete
     */
    save(data) {
        let curIdx = this._indexByPath(data);
        if (curIdx != -1) {
            this[SYM_DATA][curIdx] = data;
        } else {
            this[SYM_DATA].push(data);
        }
        let p = path.resolve(this.baseDir, this[SYM_PATH_FUNC](data));
        if (p.indexOf(this.baseDir) !== 0) {
            throw new Error(`Invalid filepath, exits baseDir [${p}]`);
        }
        mkdirp(path.dirname(p), err => {
            fs.writeFile(p, JSON.stringify(data, null, 2));
        });
    }

    /**
     * Delete record
     */
    unlink(data) {
        let curIdx = this._indexByPath(data);
        if (curIdx != -1) {
            this[SYM_DATA].splice(curIdx, 1);
        }
        fs.unlink(path.resolve(this.baseDir, this[SYM_PATH_FUNC](data)));
    }
}

/**
 * Quick file key generator
 * Pass in array of props to generate a path using/each/prop.json
 * @param {string[]} props property names to use for path.
 */
Database.QuickKey = props => d => `${props.map(k => d[k]).join("/")}.json`;
module.exports = Database;