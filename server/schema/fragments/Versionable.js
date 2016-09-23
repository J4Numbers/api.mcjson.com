var graphql = require('graphql');

module.exports = {fields:{
      introduced_at: {type: graphql.GraphQLString, description: "Version this object first appeared in"} ,
      changed_at: {type: graphql.GraphQLString, description: "Last Version this object was edited"}
  }}