var semver = require('semver');
var boolean = require('boolean');

module.exports = {
    eq: (key, val) => {
        return (e) => ((key in e) && e[key].toLowerCase() == val.toLowerCase());
    },//Straight up equality test

    str: (key, val) => {
        return (e) => ((key in e) && e[key].toLowerCase().indexOf(val.toLowerCase()) != -1);
    },//anywhere search string

    aeq: (key, val) => {
        return (e) => ((key in e) && e[key].map((i) => i.toLowerCase()).indexOf(val.toLowerCase()) != -1);
    },//Key in array, must fully exist

    arr: (key, val) => {
        return (e) => { return (key in e) && e[key].filter((i) => i.toLowerCase().indexOf(val.toLowerCase()) != -1).length > 0; };

    },//Key in array, partial match
    pre: (key, val) => { return (e) => ((key in e) && e[key].toLowerCase().indexOf(val.toLowerCase()) == 0); },//Prefix string check
    ver: (key, val) => { return (e) => ((key in e) && semver.satisfies(e[key], val)) },//Semver check
    numeric: (key, val) => {
        return (e) => {
            var r = /^(<|\>|\<\=|\>\=)?(\d+)/.exec(val);
            var op = r[1];
            var v = parseInt(r[2]);
            return (key in e) &&
                (
                    (op == ">" && e[key] > v) ||
                    (op == ">=" && e[key] >= v) ||
                    (op == "<" && e[key] < v) ||
                    (op == "<=" && e[key] <= v) ||
                    (!op && e[key] == v)
                )
        };
    },
    bool: (key, val) => {
        var b = boolean(val);
        return (e) => e[key] == b;

    }
}