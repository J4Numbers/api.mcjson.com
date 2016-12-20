let root = {
    Query: require("./Query.js"),
    Item: require("./idPrefixMod.js"),
    Block: require("./idPrefixMod.js"),
    Entity: require("./idPrefixMod.js"),
    Enchantment: require("./idPrefixMod.js"),
    StatusEffect: require("./idPrefixMod.js"),
}

if(process.env.NODE_ENV != 'production'){
    root.Mutation =  require("./Mutation.js");
}

module.exports = root;