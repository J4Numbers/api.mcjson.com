// The root provides a resolver function for each API endpoint
var path = require('path');
var Database = require("./jsonFileDB.js");

module.exports = {
    itemDB: new Database(path.resolve("./data/items")),
    blockDB: new Database(path.resolve("./data/blocks")),
    enchantmentsDB: new Database(path.resolve("./data/enchantments")),
    entitiesDB: new Database(path.resolve("./data/entities")),
    versionsDB: new Database(path.resolve("./data/versions")),
    effectsDB: new Database(path.resolve("./data/status_effect")),
}