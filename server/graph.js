var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
module.exports = graphqlHTTP({
    schema: require("./graphql/schema.js"),
    rootValue: require("./graphql/root.js"),
    graphiql: true,
});