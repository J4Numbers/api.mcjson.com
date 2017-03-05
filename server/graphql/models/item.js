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
  mod: ID

  # Id of this object, combined with mod in format mod:id
  id(
    # Prefix with the mod field value in format mod:id
    prefixMod: Boolean = false
  ): ID

  # English name of object
  name: String

  # Game version this data is from.
  version: ID

  #Is this item a technical item (not normally accessed)
  technical: Boolean
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
  mod: ID!

  # Id of this object, combined with mod in format mod:id
  id: ID!

  # English name of object
  name: String!

  # Game version this data is from.
  version: ID!

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
    items(mod: ID, id: ID, isBlock: Boolean, version:String ): [Item!]
    `,
    mutation: `
  storeItem(data: InputItem!): Void
  deleteItem(mod: ID!, id: ID!, version: ID): Void
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
            items({ itemDB, meta }, { mod, id, isBlock, version }) {
                return itemDB.query(version || `<=${meta.version.latest}`).filter(filters.filterBy({ mod, id }))
                .filter(i => isBlock == undefined ? true : (!!i.flags.isBlock) == isBlock)
                    .map(i => Object.assign({ technical: false }, i))
            }
    },
    Mutation:{
      storeItem: ({itemDB}, { data }) => itemDB.save(data),
      deleteItem: ({itemDB}, { mod, id, version }) => {
        if(version){
          return itemDB.remove({mod, id, version})
        }else{
          return itemDB.unlink({mod, id, version})
        }
      }
    }
  }
}