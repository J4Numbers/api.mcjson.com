var filters = require('./server/filters.js');
module.exports = {
  versions: {
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
      changed_at: filters.ver
    }
  },
  blocks: {
    struct: {
      id: filters.str,
      mod: filters.str,
      name: filters.str,
      introduced_at: filters.ver,
      changed_at: filters.ver
    }
  },
  enchantments: {
    struct: {
      id: filters.str,
      mod: filters.str,
      name: filters.str
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
  },
  commands: {
    struct: {
      mod: filters.str,
      name: filters.str
    }
  },
  crafting: {
    struct: {
      mod: filters.str,
      name: filters.str
    }
  }
}