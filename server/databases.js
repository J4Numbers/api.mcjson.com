// The root provides a resolver function for each API endpoint
var path = require('path');
var Database = require("./jsonFileDB.js");

var fnFile = data => { console.log("FN", data); return `${data.mod}/${data.id}.json`; }

module.exports = {
    itemDB: new Database(path.resolve("./data/items"), fnFile),
    blockDB: new Database(path.resolve("./data/blocks"), fnFile),
    enchantmentsDB: new Database(path.resolve("./data/enchantments"), fnFile),
    entitiesDB: new Database(path.resolve("./data/entities"), fnFile),
    versionsDB: new Database(path.resolve("./data/versions"), fnFile),
    effectsDB: new Database(path.resolve("./data/status_effect"), fnFile),
}