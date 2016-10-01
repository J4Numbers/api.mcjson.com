var gql = require("graphql");
var fs = require("fs");
var path = require("path");
module.exports = gql.buildSchema(fs.readFileSync(path.resolve(__dirname,"./schema.gql"),"ascii"));