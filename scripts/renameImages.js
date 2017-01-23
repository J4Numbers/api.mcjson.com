var path = require('path');
var fs = require('fs');
var dataDir = path.normalize(process.cwd() + '/data/');
var fetch = require('node-fetch');
var run = require('co');
var mkdirp = require('mkdirp');

console.log("Importing data from http://minecraft-ids.grahamedgecombe.com/");

fetch("http://minecraft-ids.grahamedgecombe.com/items.json")
    .then((resp) => { return resp.json() })
    .then((itemData) => {
        run(function* () {
            //{"type":0,"meta":0,"name":"Air","text_type":"air"}
            for (x in itemData) {
                var item = itemData[x];
                var bin = path.resolve('./data/images/', item.type < 256 ? "blocks" : "items", 'minecraft', item.text_type);
                yield mkdirp.bind(mkdirp, bin);
                yield fs.rename.bind(fs, `./data/_images/${item.type}-${item.meta}.png`, path.resolve(bin, `${item.meta}.png`));
                console.log(item.text_type);

            }
        });
    });