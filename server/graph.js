var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var readdir = require("readdir-plus");
var path = require('path');
var fs = require('fs');
// The root provides a resolver function for each API endpoint
let databases = require("./databases.js");

module.exports = graphqlHTTP({
    schema: require("./schema"),
    graphiql: true,
});