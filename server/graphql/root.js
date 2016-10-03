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
    var o = Object.assign({},obj,mixins.reduce(deepmerge,{}));
    o._ = obj;
    return o;
}; 

var ItemModel = dm({
                id({prefixMod}){
                    return (prefixMod ? this._.mod + ":":"") + this._.id;
                }
            });

/**
 * Updates an existing object, or creates a new one
 */
function mutationUpdate(fn, db){
    return ({oldId, newData})=>{
        var file = path.resolve(db.dbPath, fn(oldId));
        var newFile = path.resolve(db.dbPath, fn(newData));
        return db.entries.then( entries =>{
            var f = entries.find(e=>{
                e.file == file
            }) || new FileEntry(file, {});
            f.content = deepmerge(f.content,newData);
            f.save();
            if(file != newFile){
                f.rename(newFile);
            }

        })
    }
}

function mutationAdd(fn, db){
    return ({newData})=>{
        var file = path.resolve(db.dbPath, fn(oldItem || newData));
        return db.entries.then( entries =>{
            if(entries.find(e=>{
                e.file == file
            }) != null){
                throw new Error("Object already exists in database!");
            }else{
                f = new FileEntry(file)
                f.content = newData;
                f.save();
                entries.push(f);
                return newData;
            }
        })
    }
}

function mutationDelete(fn, db){
    return ({oldId})=>{
        var file = path.resolve(db.dbPath, fn(oldId));
        return db.entries.then( entries =>{
            var f = entries.find(e=>{
                e.file == file
            })
            if(f){
                f.delete();
                entries.splice(entries.indexOf(f),1);
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
    
    addItem: mutationAdd( data =>`${data.mod}/${data.id}.json` , itemDB),
    updateItem: mutationUpdate( data =>`${data.mod}/${data.id}.json` , itemDB),
    deleteItem: mutationDelete( data =>`${data.mod}/${data.id}.json` , itemDB),


}:{});