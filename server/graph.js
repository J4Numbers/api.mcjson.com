var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var readdir = require("readdir-plus");
var path = require('path');
var fs = require('fs');
// The root provides a resolver function for each API endpoint
let databases = require("./databases.js");

module.exports = graphqlHTTP({
    schema: require("./graphql/schema.js"),
    rootValue: require("./graphql/root.js"),
    graphiql: (process.env.NODE_ENV != 'production'),
});