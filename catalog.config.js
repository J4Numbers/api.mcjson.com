var filters = require('./server/filters.js');
module.exports = {
  versions: {
    noModId: true,
    fn: (d)=>`${d.id}.json`,
    struct: {
      id: filters.ver,
      type: filters.eq
    }
  },
  items: {
    struct: {
      id: filters.str,
      mod: filters.str,
      name: filters.str,
      introduced_at: filters.ver,
      changed_at: filters.ver,
      technical: filters.bool
    }
  },
  blocks: {
    struct: {
      id: filters.str,
      mod: filters.str,
      name: filters.str,
      introduced_at: filters.ver,
      changed_at: filters.ver,
      technical: filters.bool
    }
  },
  enchantments: {
    struct: {
      id: filters.str,
      mod: filters.str,
      name: filters.str,
      max_level: filters.numeric,
      introduced_at: filters.ver
    }
  },
  entities: {
    struct: {
      id: filters.str,
      mod: filters.str,
      name: filters.str,
      introduced_at: filters.ver,
      changed_at: filters.ver
    }
  }
//   commands: {
//     struct: {
//       mod: filters.str,
//       name: filters.str
//     }
//   },
//   crafting: {
//     struct: {
//       mod: filters.str,
//       name: filters.str
//     }
//   }
}