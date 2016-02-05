var semver = require('semver');


module.exports.eq = function(filtered, key, val){ 
return filtered.filter((e) => { return (key in e) && e[key].toLowerCase() == val.toLowerCase(); });
};//Straight up equality test

module.exports.str = function(filtered, key, val){ 
return filtered.filter((e) => { return (key in e) && e[key].toLowerCase().indexOf(val.toLowerCase()) != -1; });
};//anywhere search string

module.exports.aeq = function(filtered, key, val){ 
return filtered.filter((e) => { 
return (key in e) && e[key].map( (i)=>{return i.toLowerCase();} ).indexOf(val.toLowerCase()) != -1; });
};//Key in array, must fully exist

module.exports.arr = function(filtered, key, val){ 
return filtered.filter((e) => { 
return (key in e) && e[key].filter( (i)=>{return i.toLowerCase().indexOf(val.toLowerCase()) != -1; } ).length > 0;
});

};//Key in array, partial match
module.exports.pre = function(filtered, key, val){ 
return filtered.filter((e) => { return (key in e) && e[key].toLowerCase().indexOf(val.toLowerCase())==0; });

};//Prefix string check
module.exports.ver = function(filtered, key, val){ 
return filtered.filter((e) => { return (key in e) && semver.satisfies(e[key], val); });
};//Semver check

module.exports.numeric = function(filtered, key, val){
    return filtered.filter((e) => {
        var r = /^(<|\>|\<\=|\>\=)?(\d+)/.exec(val);
        var op = r[1];
        var v = parseInt(r[2]); 
        return (key in e) && 
        (
            (op == ">" &&  e[key] > v) ||
            (op == ">=" &&  e[key] >= v) ||
            (op == "<" &&  e[key] < v) ||
            (op == "<=" &&  e[key] <= v) ||
            (!op && e[key] == v)
        ) 
    });
}