var semver = require('semver');
var boolean = require('boolean');

/**
 * Collection of filter functions and helpers to use in .filter() / .find()
 */
module.exports = {
    array: (key, fn) => e => ((key in e) && e[key].find(fn) != undefined),
    key: (key, fn) => e => ((key in e) && fn(e[key])), //Run callback on object field [key]
    orNull: (val, fn) => e => (val == null || fn(val)(e)),
    strEqual: val => e => e.toLowerCase() == val.toLowerCase(),

    strContains: val => e => (e.toLowerCase().indexOf(val.toLowerCase()) != -1),//anywhere search string
   
    prefix: val => e => (e.toLowerCase().indexOf(val.toLowerCase()) == 0),//Prefix string check
    semver: val => e => semver.satisfies(e, val),//Semver check
    numeric: val => e => {
            var r = /^(<|\>|\<\=|\>\=)?(\d+)/.exec(val);
            var op = r[1];
            var v = parseInt(r[2]);
            return (
                    (op == ">" && e > v) ||
                    (op == ">=" && e >= v) ||
                    (op == "<" && e < v) ||
                    (op == "<=" && e <= v) ||
                    (!op && e == v)
                )
        },
    bool: val => {let b = boolean(val); return e => e == b;}
}