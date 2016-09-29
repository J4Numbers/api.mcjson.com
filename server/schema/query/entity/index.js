var graphql = require('graphql');
var mkObj = require("../mkObj");
module.exports = mkObj([{
    name: "Entity",
    fields: {
      //flags: {type: require("./flags")}
  }
},require("../fragments/Base")]);