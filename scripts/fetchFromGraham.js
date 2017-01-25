var path = require('path');
var fs = require('fs');
var dataDir = path.normalize(process.cwd() + '/data/');
var fetch = require("node-fetch");
var run = require('co');
console.log("Importing data from http://minecraft-ids.grahamedgecombe.com/");

fetch("http://minecraft-ids.grahamedgecombe.com/items.json").then(res => res.json()).then(itemData => {
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
                        "introduced_at": "1.11.0",
                        "changed_at": "1.11.0",
                        "meta": [{
                            key: "meta",
                            values: []
                        }]
                    }
                }
                newBlocks[entry.text_type].meta[0].values.push({ value: entry.name, mask: entry.meta });
                return newBlocks;
            }, {});
        for (fName in newMappings) {
            if (newMappings[fName].meta[0].values.length == 1) {
                delete newMappings[fName].meta;
            }
            console.log("Writing out new block", fName);
            yield fs.writeFile.bind(fs, path.resolve('./data/blocks/minecraft', fName + '.json'), JSON.stringify(newMappings[fName], null, 2));
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
        for (fName in newMappings) {
            if (newMappings[fName].meta[0].values.length == 1) {
                delete newMappings[fName].meta;
            }
            console.log("Writing out new item", fName);
            yield fs.writeFile.bind(fs, path.resolve('./data/items/minecraft', fName + '.json'), JSON.stringify(newMappings[fName], null, 2));
        }
    });

})
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

fetch("http://minecraft-ids.grahamedgecombe.com/entities.json").then(res => res.json()).then(entities => {

    run(function* () {
        var files = yield fs.readdirSync('./data/entities/minecraft');
        files = files.map((file) => file.split(".")[0])
        entities.filter(entity => files.indexOf(entity.text_type) === -1) //Filter existing
            .forEach(entity => {
                let oldData = {};
                try{
                    oldData = JSON.parse(fs.readFileSync(`./data/entities/minecraft/${entity.text_type}.json`))
                }catch(e){

                }
                let data = {
                    id: entity.text_type,
                    name: entity.name,
                    mod: "minecraft",
                    introduced_at: oldData.introduced_at || "1.11.0",
                    changed_at: oldData.changed_at || "1.11.0"
                }
                var entryPath = path.normalize(dataDir + '/entities/minecraft/' + data.id + '.json');
                fs.writeFileSync(entryPath, JSON.stringify(data, null, 2));
            })
    })
})