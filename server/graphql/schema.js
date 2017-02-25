var fs = require("fs");
var path = require("path");

function collateSchemas(dir) {
  return fs.readdirSync(dir).map(f => fs.readFileSync(path.resolve(dir, f), "ascii")).join("\n");
}

module.exports = [
  collateSchemas(path.resolve(__dirname, './schema')),
  process.env.NODE_ENV != 'production' ? collateSchemas(path.resolve(__dirname, './schema.editor')) : "",
  `schema {
  query: Query
  ${process.env.NODE_ENV != 'production' ? 'mutation: Mutation' : ''}
}`
];