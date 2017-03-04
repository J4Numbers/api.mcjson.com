const fs = require("fs");
const path = require("path");
let moduleQueries = [];
let moduleTypeDefinitions = [];
let moduleMutations = [];
let moduleResolvers = [];

let files = fs.readdirSync(path.resolve(__dirname + "/models"));

// Load schema files
files.forEach((file) => {
	let moduleSchema = require(path.resolve(__dirname + "/models/" + file));

	moduleQueries.push(moduleSchema.schema.query);
	moduleTypeDefinitions.push(moduleSchema.schema.typeDefinitions);
	moduleMutations.push(moduleSchema.schema.mutation);

	moduleResolvers.push(moduleSchema.resolvers);
});

// --- MERGE TYPE DEFINITONS

const schema = `
type Query {
	${moduleQueries.join("\n")}
}
${moduleTypeDefinitions.join("\n")}
type Mutation {
	${moduleMutations.join("\n")}
}
schema {
  query: Query
  mutation: Mutation
}
`;

// --- MERGE RESOLVERS

function resolverMerge(o, merged){
    merged.forEach( m => {
        Object.keys(m).forEach( key => {
            if( o[key] == undefined){
                o[key] = m[key];
            }else{
                o[key] = Object.assign({}, o[key], m[key]);
            }
        })
    })
    return o;
}
module.exports = {
	typeDefs: [schema],
	resolvers: resolverMerge({}, moduleResolvers)
};