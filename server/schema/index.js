var graphql = require('graphql');

// The root provides a resolver function for each API endpoint
let Database = require("../db.js");
var path = require('path');

let itemDB = new Database(path.resolve("./data/items"));
let blockDB = new Database(path.resolve("./data/blocks"));
let entityDB = new Database(path.resolve("./data/entities"));
let enchantmentDB = new Database(path.resolve("./data/enchantments"));

let Block = require("./block");
let Item = require("./item");
let Entity = require("./entity");
let Enchantment = require("./Enchantment");

module.exports = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: "query",
        fields: {
            items: { args:{id: {type:graphql.GraphQLString}}, type: new graphql.GraphQLList(Item), resolve: (_,{id}) => itemDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id)) },
            blocks: {  args:{id: {type:graphql.GraphQLString}}, type: new graphql.GraphQLList(Block),  resolve: (_,{id}) => blockDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))},
            entities: {  args:{id: {type:graphql.GraphQLString}}, type: new graphql.GraphQLList(Entity),  resolve: (_,{id}) => entityDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))},
            enchantments: {  args:{id: {type:graphql.GraphQLString}}, type: new graphql.GraphQLList(Enchantment),  resolve: (_,{id}) => enchantmentDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))} 
        }
    })
}) 