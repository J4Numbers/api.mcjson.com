var graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: "ItemFlags",
    fields: {
        durability: {
            description: "Amount of damage",
            type: graphql.GraphQLInt
        },
        dyeable: {
            description: "Item can be coloured",
            type: graphql.GraphQLBoolean
        },
        repairable: {
            description: "Can be smashed in an anvil to fix it.",
            type: graphql.GraphQLBoolean
        },
        enchantments: {
            description: "valid enchantments for this item", 
            type: new graphql.GraphQLList( require("../Enchantment")) 
        }
    }
});
