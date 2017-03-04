var filters = require("../../filters.js");
const base = require("../base.js");

module.exports = {
    schema:{
        typeDefinitions:`
type StatusEffect {
  
  # Mod this object comes from
  mod: String

  # Id of this object, combined with mod in format mod:id
  id(
    # Prefix with the mod field value in format mod:id
    prefixMod: Boolean = false
  ): String

  #Old ID
  num_id: Int

  # English name of object
  name: String

  # Version this object first appeared in
  introduced_at: String

  # Last Version this object was edited
  changed_at: String
}
`,
query: `
  effects(mod: String, id: String): [StatusEffect!]
`
    },
    resolvers: {
      StatusEffect: base({}),
      Query:{
        effects({ effectDB }, { mod, id }) {
                return effectDB.data().filter(filters.filterBy({ mod, id }));
            }
      }
    }
}