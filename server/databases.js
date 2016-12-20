// The root provides a resolver function for each API endpoint
var path = require('path');
var Database = require("./jsonFileDB.js");

var fnFile = data => `${data.mod}/${data.id}.json`;

module.exports = {
    itemDB: new Database(path.resolve("./data/items"), fnFile),
    blockDB: new Database(path.resolve("./data/blocks"), fnFile),
    enchantmentDB: new Database(path.resolve("./data/enchantments"), fnFile),
    entityDB: new Database(path.resolve("./data/entities"), fnFile),
    versionDB: new Database(path.resolve("./data/versions"), fnFile),
    effectDB: new Database(path.resolve("./data/status_effect"), fnFile),
}