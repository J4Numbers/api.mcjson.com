var graphql = require('graphql');
deepmerge = require("deepmerge");
module.exports = types => new graphql.GraphQLObjectType(types.reduce( deepmerge ,{}) );