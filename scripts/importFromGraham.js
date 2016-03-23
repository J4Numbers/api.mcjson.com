var path = require('path');
var fs = require('fs');
var dataDir = path.normalize(process.cwd() + '/data/');
var fetch = require("fetch").fetchUrl;
var run = require('gen-run');
console.log("Importing data from http://minecraft-ids.grahamedgecombe.com/");

fetch("http://minecraft-ids.grahamedgecombe.com/items.json", function(error, meta, body) {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    var itemData = JSON.parse(body);
    run(function* () {
        var files = yield fs.readdir.bind(fs, './data/blocks/minecraft');
        files = files.map((file) => file.split(".")[0])
        var newMappings = itemData
            .filter((item) => files.indexOf(item.text_type) === -1) //Filter existing
            .filter((item) => item.type < 256) //Filter to blocks
            .reduce((newBlocks, entry) => {
                if (!newBlocks[entry.text_type]) {
                    newBlocks[entry.text_type] = {
                        mod: "minecraft",
                        id: entry.text_type,
                        name: entry.name,
                        "technical": false,
                        "introduced_at": "1.9.0",
                        "changed_at": "1.9.0",
                        "meta": [{
                            key: "meta",
                            values: []
                        }]
                    }
                }
                newBlocks[entry.text_type].meta[0].values.push({ value: entry.name, mask: entry.meta });
                return newBlocks;
            }, {});
        for(fName in newMappings){
            if(newMappings[fName].meta[0].values.length == 1){
                delete newMappings[fName].meta;
            }
            console.log("Writing out new block", fName);
            yield fs.writeFile.bind(fs,path.resolve('./data/blocks/minecraft',fName + '.json'),JSON.stringify(newMappings[fName], null, 2));
        }
    });
    
    run(function* () {
        var files = yield fs.readdir.bind(fs, './data/items/minecraft');
        files = files.map((file) => file.split(".")[0])
        var newMappings = itemData
            .filter((item) => files.indexOf(item.text_type) === -1) //Filter existing
            .filter((item) => item.type >= 256) //Filter to blocks
            .reduce((newBlocks, entry) => {
                if (!newBlocks[entry.text_type]) {
                    newBlocks[entry.text_type] = {
                        mod: "minecraft",
                        id: entry.text_type,
                        name: entry.name,
                        "introduced_at": "1.9.0",
                        "changed_at": "1.9.0",
                        "meta": [{
                            key: "meta",
                            values: []
                        }]
                    }
                }
                newBlocks[entry.text_type].meta[0].values.push({ value: entry.name, mask: entry.meta });
                return newBlocks;
            }, {});
        for(fName in newMappings){
            if(newMappings[fName].meta[0].values.length == 1){
                delete newMappings[fName].meta;
            }
            console.log("Writing out new item", fName);
            yield fs.writeFile.bind(fs,path.resolve('./data/items/minecraft',fName + '.json'),JSON.stringify(newMappings[fName], null, 2));
        }
    });
    
});
/*
fetch("http://minecraft-ids.grahamedgecombe.com/entities.tsv", function(error, meta, body) {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    _(body.toString().split("\n"))
        .each(function(e) {
            line = e.split("\t");
            entry = {
                id: line[2],
                name: line[1],
                mod: "minecraft",
                introduced_at: "1.9.0",
                changed_at: "1.9.0"
            };
            if (!entry.id) { return; }
            var entryPath = path.normalize(dataDir + '/entities/minecraft/' + entry.id + '.json');
            try {
                var stats = fs.statSync(entryPath);
            } catch (e) {
                console.log("NEW ENTITY", entry.name);
                fs.writeFileSync(entryPath, JSON.stringify(entry, null, 2));
            }
        })
        .value()
})
*/