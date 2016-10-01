var graphql = require('graphql');
var mkObj = require("../mkObj");
module.exports = mkObj([{
    name: "Enchantment",
    fields: {      
      num_id: {type: graphql.GraphQLInt, description: "Numeric id"} ,
      level: {type: graphql.GraphQLInt, description: "Max level"}
  }
}, require("./fragments/base")]);