var fs = require('fs');
var path = require('path');
var Validator = require('jsonschema').Validator;


function loadJSON(filename, cb) {
    if (!cb) { return loadJSON.bind(this, filename); }
    fs.readFile(filename, 'ascii', function(err, body) {
        if (err) {
            return cb(err);
        }
        try{
            cb(null, JSON.parse(body));
        }catch(e){
            console.error("ERROR PARSING FILE", filename);
            console.error(e);
        }
    });
}

function saveJSON(filename,data, cb) {
    if (!cb) { return saveJSON.bind(this, filename, data); }
    fs.writeFile(filename, JSON.stringify(data, null, 2), function(err, body) {
        if (err) {
            return cb(err);
        }
        cb(null);
    });
}

function getValidator(initialSchema, cb) {

    var Validator = require('jsonschema').Validator;
    var v = new Validator();

    loadJSON(path.join('./schemas', initialSchema), function(err, schema) {
        if (err) {
            return cb(err);
        }
        v.addSchema(schema, initialSchema);
        function importNextSchema() {
            var nextSchema = v.unresolvedRefs.shift();
            if (!nextSchema) { cb(null, initialSchema, v); return; }
            console.log("RESOLVING", nextSchema);
            loadJSON(path.join('./schemas', nextSchema), function(err, schema) {
                if (err) {
                    return cb(err);
                }
                v.addSchema(schema, nextSchema);
                importNextSchema();
            });

        }
        importNextSchema();
    })
}
var run = require('gen-run');

getValidator('/block.json', function(err, schema, v) {
    console.log(err);
    run(function* () {
        var valid = 0, invalid = 0;
        var files = yield fs.readdir.bind(fs, 'data/blocks/minecraft/');
        files = files.map((e) => `./data/blocks/minecraft/${e}`);
        for (x in files) {
            json = yield loadJSON(files[x]);
            res = v.validate(json, '/block.json');
            if (!res.valid) {
                invalid++;
                console.log(files[x]);
                res.errors.forEach((err) => {
                    console.log(`${err.property} ${err.message}`);
                });
                
                json.meta = Object.keys(json.meta).map((key)=>{
                    return {
                        key: key,
                        values: Object.keys(json.meta[key]).map((value)=>{ return {value:value, mask: json.meta[key][value]}; })
                    };
                })
                yield saveJSON(files[x], json);
                
                console.log();
            } else {
                valid++;
                //console.log(files[x],"VALID");
            }
        }
        console.error("Valid", valid, valid + invalid);
        console.error("Invalid", invalid, valid + invalid);
    })
})
