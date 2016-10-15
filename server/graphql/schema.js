var gql = require("graphql");
var fs = require("fs");
var path = require("path");

function collateSchemas(dir){
  return fs.readdirSync(dir).map( f => fs.readFileSync(path.resolve(dir,f),"ascii") ).join("\n");
}

module.exports = gql.buildSchema(  
  [
    collateSchemas(path.resolve(__dirname,'./schema')),
`schema {
  query: query
  ${process.env.NODE_ENV != 'production' ? 'mutation: mutation' : ''}
}`
,
process.env.NODE_ENV != 'production' ? fs.readFileSync(path.resolve(__dirname,"./schema.editor/editor.gql"),"ascii") : "",
].join("\n"));