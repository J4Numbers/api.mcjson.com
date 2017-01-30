let databases = require("../../databases.js");
let itemDB = databases.itemDB;
let entityDB = databases.entitieDB;
let enchantmentDB = databases.enchantmentDB;
let effectDB = databases.effectDB;

function mutationUpdate(db){
    return (_,{oldId, newData}) => db.save(newData, oldId);
}

function mutationAdd(db){
    return (_,{newData}) => db.save(newData);
}

function mutationDelete(db){
    return (_,{oldId}) => db.unlink(oldId)
}

module.exports = {
    addItem: mutationAdd(itemDB),
    updateItem: mutationUpdate(itemDB),
    deleteItem: mutationDelete(itemDB),

    addEnchantment: mutationAdd(enchantmentDB),
    updateEnchantment: mutationUpdate(enchantmentDB),
    deleteEnchantment: mutationDelete(enchantmentDB),

    addEntity: mutationAdd(entityDB),
    updateEntity: mutationUpdate(entityDB),
    deleteEntity: mutationDelete(entityDB),

    addStatusEffect: mutationAdd(effectDB),
    updateStatusEffect: mutationUpdate(effectDB),
    deleteStatusEffect: mutationDelete(effectDB),
}