let databases = require("../databases.js");
let itemDB = databases.itemDB;
let blockDB = databases.blockDB;
let entityDB = databases.entitiesDB;
let enchantmentDB = databases.enchantmentsDB;
let versionsDB = databases.versionsDB;

module.exports ={
    items({id}){
        return itemDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id) );
    },
    blocks({id}){
        return blockDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id) );
    },
    entities({id}){
        return entityDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id) );
    },
    enchantments({id}){
        return enchantmentDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id) );
    },
    versions({id}){
        return versionsDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).filter(e => type == null || e.type == type))
    }
}