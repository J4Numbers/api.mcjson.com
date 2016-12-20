let databases = require("../../databases.js");
let itemDB = databases.itemDB;
let blockDB = databases.blockDB;
let entityDB = databases.entitiesDB;
let enchantmentDB = databases.enchantmentsDB;
let versionsDB = databases.versionsDB;
let statusEffectsDB = databases.effectsDB;

function mutationUpdate(db){
    return (_,{oldId, newData}) => db.update(oldId, newData);
}

function mutationAdd(db){
    return (_,{newData}) => db.add(newData);
}

function mutationDelete(db){
    return (_,{oldId}) => db.delete(oldId)
}

module.exports = {
    addItem: mutationAdd(itemDB),
    updateItem: mutationUpdate(itemDB),
    deleteItem: mutationDelete(itemDB),

    addBlock: mutationAdd(blockDB),
    updateBlock: mutationUpdate(blockDB),
    deleteBlock: mutationDelete(blockDB),

    addEnchantment: mutationAdd(enchantmentDB),
    updateEnchantment: mutationUpdate(enchantmentDB),
    deleteEnchantment: mutationDelete(enchantmentDB),

    addEntity: mutationAdd(entityDB),
    updateEntity: mutationUpdate(entityDB),
    deleteEntity: mutationDelete(entityDB),

    addStatusEffect: mutationAdd(statusEffectsDB),
    updateStatusEffect: mutationUpdate(statusEffectsDB),
    deleteStatusEffect: mutationDelete(statusEffectsDB),
}