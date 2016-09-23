var graphql = require('graphql');

module.exports = {fields:{
      mod: {type: graphql.GraphQLString, description: "Mod this object comes from"} ,
      id: {type: graphql.GraphQLString, description: "Id of this object, combined with mod in format mod:id"} ,
      name: {type: graphql.GraphQLString, description: "English name of object"}
  }}