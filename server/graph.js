var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var path = require('path');
var fs = require('fs');
var readdir = require("readdir-plus");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type Item {
      mod: String,
      id: String,
      name: String,
      introduced_at: String,
      changed_at: String,
      meta: [Meta]

  }
  
  type Meta {
      key: String,
      values: [MetaEntry]
  }
  type MetaEntry {
      value: String,
      mask: Int
  }

  type Query {
    items(id: String): [Item]
  }
`);

// The root provides a resolver function for each API endpoint
let Database = require("./db.js");
let itemDB = new Database(path.resolve("./data/items"));


var root = {
    items: (args) => {
        return itemDB.entries.then(items => items.map(e => e.data()).filter(e => args.id == null || e.id == args.id))
    },
};

module.exports = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
});