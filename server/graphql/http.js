var graphqlHTTP = require('express-graphql');
var makeExecutableSchema = require("graphql-tools").makeExecutableSchema;

//Make the schema
var jsSchema = makeExecutableSchema(require("./index.js"));

module.exports = graphqlHTTP({
     schema: jsSchema,
    rootValue: require("../databases.js"),
    graphiql: true,
});