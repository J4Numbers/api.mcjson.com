var graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: "MetaEntry",
    fields: {
      value: {type: graphql.GraphQLString},
      mask: {type: graphql.GraphQLInt}
  }
});