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
    if (!cb) { return getValidator.bind(this, initialSchema); }
    
    var Validator = require('jsonschema').Validator;
    var v = new Validator();

    loadJSON(path.join('./schemas', initialSchema), function(err, schema) {
        if (err) {
            return cb(err);
        }
        v.addSchema(schema, initialSchema);
        function importNextSchema() {
            var nextSchema = v.unresolvedRefs.shift();
            if (!nextSchema) { cb(null, v); return; }
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
function* validateTable(tablePath, schemaFile){
    var v = yield getValidator(schemaFile)
    var valid = 0, invalid = 0;
    var files = yield fs.readdir.bind(fs, tablePath);
    files = files.map((e) => path.join(tablePath, e));
    for (x in files) {
        json = yield loadJSON(files[x]);
        res = v.validate(json, schemaFile);
        if (!res.valid) {
            invalid++;
            console.log(files[x]);
            res.errors.forEach((err) => {
                console.log(`${err.property} ${err.message}`);
            });
            if(!Array.isArray(json.meta)){
                console.log("Patching JSON");
                json.meta = Object.keys(json.meta).map((k)=>{
                    return {
                        key: k,
                        values: Object.keys(json.meta[k]).map((value)=>{
                            return {
                                value: value,
                                mask: json.meta[k][value]
                            }
                        })
                    }
                });
                saveJSON(files[x], json);
            }
            console.log();
        } else {
            valid++;
            //console.log(files[x],"VALID");
        }
    }
    console.error("Valid", valid, valid + invalid);
    console.error("Invalid", invalid, valid + invalid);
}

run(function* () {
    console.log("Validating blocks");
    yield* validateTable('./data/blocks/minecraft','/block.json');
    
    console.log("Validating items");
    yield* validateTable('./data/items/minecraft','/item.json');
})

