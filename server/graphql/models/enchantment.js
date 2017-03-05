var filters = require("../../filters.js");
const base = require("../base.js");

module.exports = {
    schema:{
        typeDefinitions:`
# An item enchantment that can be applied to stuff
type Enchantment {
  # Numeric id of enchantment
  num_id: Int

  # Max level of enchantment
  level: Int

  # Mod this enchantment comes from
  mod: ID

  # Id of this enchantment
  id(
    # Prefix with the mod field value in format mod:id
    prefixMod: Boolean = false
  ): ID

  # English name of enchantment
  name: String

  # Version this enchantment first appeared in
  version: ID
}
`,
query: `
  enchantments(mod: ID, id: ID, version: ID): [Enchantment!]

`
    },
    resolvers: {
      Enchantment: base({}),
      Query:{
        enchantments({ enchantmentDB, meta }, { mod, id, version }) {
            return enchantmentDB.query( meta.version.mapping[version || meta.version.latest.id] ).filter(filters.filterBy({ mod, id }));
        },
      }
    }
}