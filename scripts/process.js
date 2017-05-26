let databases = require("../server/databases.js");
var fs = require("fs");
let keys = Object.keys(databases.itemDB.data()).filter( v => v.indexOf("shulker") !== -1);

keys.forEach( key => {
    let entries = databases.itemDB.data()[key];

    entries.forEach(entry => {
        entry.flags.editors = undefined;
        databases.itemDB.save(entry);
    })
})