var path = require("path");
let deepmerge = require("deepmerge");
let databases = require("../databases.js");
let FileEntry = require("../jsonFileDB.js").FileEntry;
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
            var f = entries.find(e=> (e.file == file) ) || new FileEntry(file, {});
            f.content = newData;
            f.save();
            if(file != newFile){
                f.rename(newFile);
            }
            return newData;
        })
    }
}

function mutationAdd(fn, db){
    return ({newData})=>{
        var file = path.resolve(db.dbPath, fn(oldItem || newData));
        return db.entries.then( entries =>{
            if(entries.find(e=> (e.file == file) ) != null){
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
        var file = path.join(db.dbPath, fn(oldId));
        return db.entries.then( entries =>{
            var f = entries.find(e=> (e.file == file))
            if(f){
                f.delete();
                entries.splice(entries.indexOf(f),1);
                return f.content;
            }
            else{
                throw new Error("Cannot find entry with file path of " + file);
            }
        })
    } 
}

function filterBy(values){
    return (entry) => Object.keys(values).map( e=> [e,values[e]]).filter( e=> e[1]!=undefined).map( e=> entry[e[0]] == e[1] ).reduce( (a,b)=> a&&b , true);
}

module.exports = Object.assign({
    items({mod,id}) {
        return itemDB.entries.then(
            items => items.map(e => e.data()).filter(e => id == null || e.id == id).map( ItemModel )
        );
    },
    blocks({mod,id}) {
        return blockDB.entries.then(items => items.map(e => e.data()).filter(filterBy({mod, id})).map( ItemModel ));
    },
    entities({mod,id}) {
        return entityDB.entries.then(items => items.map(e => e.data()).filter(filterBy({mod, id})).map( ItemModel ));
    },
    enchantments({mod,id}) {
        return enchantmentDB.entries.then(items => items.map(e => e.data()).filter(filterBy({mod, id})).map( ItemModel ));
    },
    versions({id, type}) {
        return versionsDB.entries.then(items => items.map(e => e.data()).filter(filterBy({type, id})));
    }    
},
process.env.NODE_ENV != 'production' ? {
    
    addItem: mutationAdd( data =>(`${data.mod}/${data.id}.json`) , itemDB),
    updateItem: mutationUpdate( data =>(`${data.mod}/${data.id}.json`) , itemDB),
    deleteItem: mutationDelete( data =>(`${data.mod}/${data.id}.json`) , itemDB),

    addBlock: mutationAdd( data =>(`${data.mod}/${data.id}.json`) , blockDB),
    updateBlock: mutationUpdate( data =>(`${data.mod}/${data.id}.json`) , blockDB),
    deleteBlock: mutationDelete( data =>(`${data.mod}/${data.id}.json`) , blockDB),



}:{});