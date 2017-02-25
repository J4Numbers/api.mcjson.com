let databases = require("../../databases.js");
let itemDB = databases.itemDB;
let entityDB = databases.entitieDB;
let enchantmentDB = databases.enchantmentDB;
let effectDB = databases.effectDB;

function mutationAdd(db){
    return (_,{newData}) => db.save(newData);
}

function mutationDelete(db){
    return (_,{oldId}) => db.unlink(oldId)
}

module.exports = {
    storeItem: mutationAdd(itemDB),
    deleteItem: mutationDelete(itemDB),

    // storeEnchantment: mutationAdd(enchantmentDB),
    // deleteEnchantment: mutationDelete(enchantmentDB),

    // storeEntity: mutationAdd(entityDB),
    // deleteEntity: mutationDelete(entityDB),

    // storeStatusEffect: mutationAdd(effectDB),
    // deleteStatusEffect: mutationDelete(effectDB),
}