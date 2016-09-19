var graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: "Meta",
    fields: {
      key: {type: graphql.GraphQLString},
      values: {type: new graphql.GraphQLList( require("./MetaEntry.js") ) }
  }
});