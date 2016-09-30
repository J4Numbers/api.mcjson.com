var graphql = require('graphql');

// The root provides a resolver function for each API endpoint
let Database = require("../db.js");
var path = require('path');

let databases = require("../databases.js");
let itemDB = databases.itemDB;
let blockDB = databases.blockDB;
let entityDB = databases.entitiesDB;
let enchantmentDB = databases.enchantmentsDB;
let versionsDB = databases.versionsDB;

let Block = require("./query/block");
let Item = require("./query/item");
let Entity = require("./query/entity");
let Enchantment = require("./query/Enchantment");
let Version = require("./query/Version");

module.exports = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: "query",
        fields: {
            items: {
                args: {
                    id: { type: graphql.GraphQLString }
                }, type: new graphql.GraphQLList(Item), resolve: (_, {id}) => itemDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))
            },
            blocks: {
                args: {
                    id: { type: graphql.GraphQLString }
                }, type: new graphql.GraphQLList(Block), resolve: (_, {id}) => blockDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))
            },
            entities: {
                args: {
                    id: { type: graphql.GraphQLString }
                }, type: new graphql.GraphQLList(Entity), resolve: (_, {id}) => entityDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))
            },
            enchantments: {
                args: {
                    id: { type: graphql.GraphQLString }
                }, type: new graphql.GraphQLList(Enchantment), resolve: (_, {id}) => enchantmentDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id))
            },
            versions: {
                args: {
                    id: { type: graphql.GraphQLString },
                    type: { type: graphql.GraphQLString }
                },
                type: new graphql.GraphQLList(Version),
                resolve: (_, {id, type}) => versionsDB.entries.then(items => items.map(e => e.data()).filter(e => id == null || e.id == id).filter(e => type == null || e.type == type))
            }
        }
    }),
    mutation: new graphql.GraphQLObjectType({
        name: "mutation",
        fields: {
            addItem: {
                args: { oldId: { type: graphql.GraphQLString }, newData: { type: graphql.GraphQLInt } }, type: Item, resolve: (_, args) => {
                    console.log("ADDITEM", args)
                    //TODO:
                    //Overwrite record
                    //Save
                    //Rename if oldId != newId

                }
            }
        }
    })
}) 