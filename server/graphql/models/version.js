var filters = require("../../filters.js");
const base = require("../base.js");

module.exports = {
  schema: {
    typeDefinitions: `
type Version {
  id: String!
  
  #mod: String
  version: String!
  type: VersionType!
  released: String!
}
enum VersionType{
  SNAPSHOT,
  RELEASE
}
`,
    query: `
  versions(id: String, type: VersionType): [Version!]
`
  },
  resolvers: {
    Query: {
      versions({ versionDB }, { id, type }) {
        return versionDB.data().filter(filters.filterBy({ type, id }));
      }
    }
  }
}