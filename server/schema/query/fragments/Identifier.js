var graphql = require('graphql');

module.exports = {
  fields: {
    mod: { type: graphql.GraphQLString, description: "Mod this object comes from" },
    id: {
      args: { prefixMod: { type: graphql.GraphQLBoolean, defaultValue: false, description: "Prefix with the mod field value in format mod:id" } },
      type: graphql.GraphQLString,
      resolve: (_,{prefixMod}) => ( (prefixMod ? `${_.mod}:`:"") +  _.id),
      description: "Id of this object, combined with mod in format mod:id"
    },
    name: { type: graphql.GraphQLString, description: "English name of object" }
  }
}