var graphql = require('graphql');

// The root provides a resolver function for each API endpoint
let Database = require("../db.js");
var path = require('path');

let itemDB = new Database(path.resolve("./data/items"));
let blockDB = new Database(path.resolve("./data/blocks"));

let BlockItem = require("./BlockItem.js");

module.exports = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: "query",
        fields: {
            items: { args:{id: {type:graphql.GraphQLString}}, type: new graphql.GraphQLList(BlockItem), resolve: (_,{id}) => itemDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id)) },
            blocks: {  args:{id: {type:graphql.GraphQLString}}, type: new graphql.GraphQLList(BlockItem),  resolve: (_,{id}) => blockDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))} 
        }
    })
}) 