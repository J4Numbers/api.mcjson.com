var graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: "Enchantment",
    fields: {
      mod: {type: graphql.GraphQLString, description: "Mod this item comes from"} ,
      id: {type: graphql.GraphQLString, description: "Id of this item, combined with mod in format mod:id"} ,
      name: {type: graphql.GraphQLString, description: "English name of item"} ,
      introduced_at: {type: graphql.GraphQLString, description: "Version this item first appeared in"} ,
      changed_at: {type: graphql.GraphQLString, description: "Last Version this item was edited"} ,
      
      num_id: {type: graphql.GraphQLInt, description: "Numeric id"} ,
      level: {type: graphql.GraphQLInt, description: "Max level"}
  }
});