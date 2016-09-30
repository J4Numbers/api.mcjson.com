var graphql = require('graphql');
var mkObj = require("./mkObj");
module.exports = mkObj([{
  name: "Version",
  fields: {
    id: { type: graphql.GraphQLString },
    mod: { type: graphql.GraphQLString },
    type: { type: graphql.GraphQLString },
    released: { type: graphql.GraphQLString },
  }
}]);