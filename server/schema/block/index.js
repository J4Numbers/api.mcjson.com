var graphql = require('graphql');
var mkObj = require("../mkObj");
module.exports = mkObj([{
    name: "Block",
    fields: {
      meta: {type: new graphql.GraphQLList( require("../common/Meta.js") ), description: "Metadata settings" },
      flags: {type: require("./flags")}
  }
},require("../fragments/Base")]);