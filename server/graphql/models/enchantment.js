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
  mod: String

  # Id of this enchantment
  id(
    # Prefix with the mod field value in format mod:id
    prefixMod: Boolean = false
  ): String

  # English name of enchantment
  name: String

  # Version this enchantment first appeared in
  introduced_at: String

  # Last Version this enchantment was edited
  changed_at: String
}
`,
query: `
  enchantments(mod: String, id: String): [Enchantment!]

`
    },
    resolvers: {
      Enchantment: base({}),
      Query:{
        enchantments({ enchantmentDB }, { mod, id }) {
            return enchantmentDB.data().filter(filters.filterBy({ mod, id }));
        },
      }
    }
}