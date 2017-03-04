var filters = require("../../filters.js");
const base = require("../base.js");

module.exports = {
  schema: {
    typeDefinitions: `#An item or block
type Item {
  # Raw blockstate/metadata
  meta: [Meta!]
  #item variants (wool, logs etc)
  variants: [Variant!]

  flags: ItemFlags

  # Mod this object comes from
  mod: String

  # Id of this object, combined with mod in format mod:id
  id(
    # Prefix with the mod field value in format mod:id
    prefixMod: Boolean = false
  ): String

  # English name of object
  name: String

  # Version this object first appeared in
  introduced_at: String

  # Last Version this object was edited
  changed_at: String

  #Is this item a technical item (not normally accessed)
  technical: Boolean!
}

type Variant {
  label: String!
  value: Int!
}

type ItemFlags {

  # Is this item a block
  isBlock: Boolean!

  # Amount of damage
  durability: Int

  # Item can be coloured
  dyeable: Boolean

  # Can be smashed in an anvil to fix it.
  repairable: Boolean

  # valid enchantments for this item
  enchantments: [Enchantment!]

  inventory: InventoryFormat

  # Does this block obey physics (sand/gravel/anvil)
  physics: Boolean

  # Resistance to explosions
  blastResistance: Float

  # Resistance to mining
  hardness: Float

  # Does this block prevent piston movement
  unpushable: Boolean

  # Is this block transparent (no suffocate damage)
  transparent: Boolean
  # Light data
  light: BlockFlagsLight

  # Editors to use for this objects NBT data.
  editors: [NBTEditors!]
}

type InventoryFormat {
    slots: Int!
    type: InventoryType!
}

enum InventoryType {
  CHEST,
  DISPENSER
}

type BlockFlagsLight {
  # Amount of light emitted by block
  emit: Int

  # Amount of light that is dropped as it passes through this block
  decay: Int
}    

type Meta {
  key: String
  values: [MetaEntry]
  technical: Boolean
}

type MetaEntry {
  value: String
  technical: Boolean
  mask: Int
}

enum NBTEditors {
    #This object accepts potion data
    POTION,
    #This object accepts book data
    BOOK,
    #This object accepts Author data
    AUTHOR,
    #This object accepts Banner decals
    BANNER,
    #This object accepts firwork star data
    FIREWORK,
    #Beacon data
    BEACON,
    #Sign data
    SIGN,
    #Spawn data
    SPAWNER
}
` + `
input InputItem {
  # Mod this object comes from
  mod: String!

  # Id of this object, combined with mod in format mod:id
  id: String!

  # English name of object
  name: String!

  # Version this object first appeared in
  introduced_at: String!

  # Last Version this object was edited
  changed_at: String!

  #Is this item a technical item (not normally accessed)
  technical: Boolean!

  variants: [InputVariant!]
  # Metadata settings
  meta: [InputMeta!]
  flags: InputItemFlags

}

input InputVariant {
  label: String!
  value: Int!
}


input InputMeta {
  key: String
  values: [InputMetaEntry]
  technical: Boolean
}

input InputMetaEntry {
  value: String
  technical: Boolean
  mask: Int
}


input InputItemFlags {

  # Is this item a block
  isBlock: Boolean!

  # Amount of damage
  durability: Int

  # Item can be coloured
  dyeable: Boolean

  # Can be smashed in an anvil to fix it.
  repairable: Boolean

  # valid enchantments for this item
  enchantments: [String!]# TODO: make work

  inventory: InputInventoryFormat

  # Does this block obey physics (sand/gravel/anvil)
  physics: Boolean

  # Resistance to explosions
  blastResistance: Float

  # Resistance to mining
  hardness: Float

  # Does this block prevent piston movement
  unpushable: Boolean

  # Is this block transparent (no suffocate damage)
  transparent: Boolean
  # Light data
  light: InputBlockFlagsLight

  # Editors to use for this objects NBT data.
  editors: [NBTEditors!]

}

input InputInventoryFormat {
    slots: Int!
    type: InventoryType!
}


input InputBlockFlagsLight {
  # Amount of light emitted by block
  emit: Int

  # Amount of light that is dropped as it passes through this block
  decay: Int
}
`

,
    query: `
    items(mod: String, id: String, isBlock: Boolean): [Item!]
    `,
    mutation: `
  storeItem(data: InputItem!): Item
  deleteItem(mod: String!, id: String!): Item
`,
  },
  resolvers: {
    Item: base({
      meta: (_) => _.meta || [],
      technical: (_) => !!_.technical,
      variants: (_) => _.variants || [{ label: _.name, value: 0 }],
    }),

    ItemFlags: {
      isBlock: (_) => !!_.isBlock
    },
    Query: {
            items({ itemDB }, { mod, id, isBlock, introduced_at }) {
                return itemDB.data().filter(filters.filterBy({ mod, id })).filter(
                    filters.key(
                        "introduced_at",
                        filters.orNull(introduced_at, filters.semver)
                    )
                ).filter(i => isBlock == undefined ? true : (!!i.flags.isBlock) == isBlock)
                    .map(i => Object.assign({ technical: false }, i))
            }
    },
    Mutation:{
      storeItem: ({itemDB}, { data }) => itemDB.save(data),
      deleteItem: ({itemDB}, { oldId }) => itemDB.unlink(oldId)
    }
  }
}