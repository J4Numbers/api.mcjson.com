var fs = require('fs');
var path = require('path');
var Validator = require('jsonschema').Validator;


function loadJSON(filename, cb) {
    fs.readFile(path.join('./schemas', filename), 'ascii', function(err, body) {
        if (err) {
            return cb(err);
        }
        cb(null, JSON.parse(body));
    });
}

function getValidator(initialSchema, cb) {

    var Validator = require('jsonschema').Validator;
    var v = new Validator();

    loadJSON(initialSchema, function(err, schema) {
        if (err) {
            return cb(err);
        }
        v.addSchema(schema,initialSchema);
        function importNextSchema() {
            var nextSchema = v.unresolvedRefs.shift();
            if (!nextSchema) { cb(null,initialSchema, v); return; }
            console.log("RESOLVING", nextSchema);
            loadJSON(nextSchema, function(err, schema) {
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
var data = JSON.parse(fs.readFileSync('data/blocks/minecraft/wool.json','ascii'))
getValidator('/block.json', function(err,schema,v){
    console.log(err);
    console.log(
        v.validate(data,'/block.json')
    );
})
