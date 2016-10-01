var path = require("path");
let deepmerge = require("deepmerge");
let databases = require("../databases.js");
let FileEntry = require("../db.js").FileEntry;
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

function makeMutation(fn, db){
    return ({oldItem, newData})=>{
        var file = path.resolve(db.dbPath, fn(oldItem || newData));
        return db.entries.then( entries =>{
            var f = entries.find(e=>{
                e.file == file
            }) || new FileEntry(file);
            f.content = newData;
            f.save();
            if(oldItem){
                f.rename(file);
            }
        })
    }
}

module.exports = Object.assign({
    items({mod,id}) {
        return itemDB.entries.then(
            items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel )
        );
    },
    blocks({mod,id}) {
        return blockDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel ));
    },
    entities({mod,id}) {
        return entityDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel ));
    },
    enchantments({mod,id}) {
        return enchantmentDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel ));
    },
    versions({id, type}) {
        console.log(type);
        return versionsDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).filter(e => type == null || e.type == type))
    }    
},
process.env.NODE_ENV != 'production' ? {
    addItem: makeMutation( data =>`${data.mod}/${data.id}.json` , itemDB)
}:{});