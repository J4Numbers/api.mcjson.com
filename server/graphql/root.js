let deepmerge = require("deepmerge");
let databases = require("../databases.js");
let itemDB = databases.itemDB;
let blockDB = databases.blockDB;
let entityDB = databases.entitiesDB;
let enchantmentDB = databases.enchantmentsDB;
let versionsDB = databases.versionsDB;
let dm = (...mixins) => (obj) => { 
    var o = Object.assign({},mixins.reduce(deepmerge,{}));
    o._ = obj;
    return o;
}; 

var ItemModel = dm({
                id({prefixMod}){
                    return (prefixMod ? this._.mod + ":":"") + this._.id;
                }
            });

module.exports = Object.assign({
    items({id}) {
        return itemDB.entries.then(
            items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel )
        );
    },
    blocks({id}) {
        return blockDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel ));
    },
    entities({id}) {
        return entityDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel ));
    },
    enchantments({id}) {
        return enchantmentDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel ));
    },
    versions({id, type}) {
        return versionsDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).filter(e => type == null || e.type == type))
    }    
},
process.env.NODE_ENV != 'production' ? {
    addItem({oldItem, newData}){
        console.log(newData);
        return newData;
    }
}:{});